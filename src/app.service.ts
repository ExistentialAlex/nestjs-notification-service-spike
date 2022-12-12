import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationBuilderFactory } from './builders/notification-builder-factory';
import { NotificationDeliveryType, NotificationState } from './enums';
import { IUnsentNotification } from './interfaces/unsent-notifications.interface';
import { ClientContactService } from './modules/ClientContact/services/client-contact.service';
import { NotificationEntity } from './modules/notifications/entities/notification.entity';
import { NotificationDestinationUserGroupService } from './modules/notifications/services/notification-destination-user-group.service';
import { NotificationTypeService } from './modules/notifications/services/notification-type.service';
import { NotificationValueService } from './modules/notifications/services/notification-value.service';
import { NotificationService } from './modules/notifications/services/notification.service';
import { SysParamService } from './modules/sys-param/services/sys-param.service';
import { UserEntity } from './modules/user/entities/user.entity';
import { UserService } from './modules/user/user.service';
import { EmailNotificationSender } from './senders/email-notification.sender';

@Injectable()
export class AppService {
  constructor(
    private notificationService: NotificationService,
    private notificationTypeService: NotificationTypeService,
    private notificationDestinationUserGroupService: NotificationDestinationUserGroupService,
    private notificationValueService: NotificationValueService,
    private userService: UserService,
    private clientContactService: ClientContactService,
    private sysParamService: SysParamService,
    private emailNotificationSender: EmailNotificationSender,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendNotifications() {
    console.log('Finding unsent notifications');

    const unsentNotifications = await this.getNotificationsToSend();

    if (unsentNotifications.length < 1) {
      console.log('No notifications to send');
      return;
    }

    console.log(`${unsentNotifications.length} unsent notification(s)`);

    const notificationsBeingSent = [];

    for (let i = 0; i < unsentNotifications.length; i++) {
      console.log(
        `Attempting to send notification ${
          unsentNotifications[i].NotificationID
        } (${i + 1} of ${unsentNotifications.length})`,
      );
      notificationsBeingSent.push(
        this.sendNotification(unsentNotifications[i]),
      );
    }

    // Send all notifications in parallel.
    await Promise.all(notificationsBeingSent);

    console.log('Notifications Sent');
  }

  private async sendNotification(unsentNotification: IUnsentNotification) {
    try {
      // Get the notification values from the database.
      unsentNotification.Values = (
        await this.notificationValueService.find({
          NotificationID: unsentNotification.NotificationID,
        })
      ).reduce(
        (acc, cur) => ({
          ...acc,
          [cur.NotificationKey]: cur.NotificationValue,
        }),
        {},
      );

      // build the notification, in this case it will be an email
      const builder = NotificationBuilderFactory.getBuilder(
        unsentNotification.DeliveryType,
      );
      const sender = this.getSender(unsentNotification.DeliveryType);

      console.log(
        `|--> Building notification ${unsentNotification.NotificationID}`,
      );
      const notificationToSend = builder.buildNotification(unsentNotification);

      const attachment = unsentNotification.AttachmentName
        ? builder.buildAttachment(unsentNotification.AttachmentName)
        : null;

      console.log(
        `|--> Sending notification ${unsentNotification.NotificationID}`,
      );
      await sender.sendNotification(notificationToSend, attachment);

      // Mark as sent
      const notification = await this.notificationService.findOne({
        NotificationID: unsentNotification.NotificationID,
      });

      notification.DateSent = new Date(Date.now());
      notification.Status = NotificationState.sent;

      await this.notificationService.update(notification);

      console.log(
        `|--> Notification ${unsentNotification.NotificationID} Sent`,
      );
    } catch (err) {
      console.error(
        `|--> Notification ${unsentNotification.NotificationID} failed to send: ${err.message}\n`,
      );
      // Mark as unsent
      const notification = await this.notificationService.findOne({
        NotificationID: unsentNotification.NotificationID,
      });
      notification.Status = NotificationState.unsent;

      await this.notificationService.update(notification);
    }
  }

  async getNotificationsToSend(): Promise<IUnsentNotification[]> {
    // Get the notification types
    const notificationTypes = await this.notificationTypeService.findAll();

    // Get the unsent notifications that have a valid notification type
    const notifications = (
      await this.notificationService.find({ Status: 1 })
    ).filter(
      (n) =>
        notificationTypes.findIndex(
          (t) => t.NotificationTypeID === n.NotificationType,
        ) > -1,
    );

    // Return early to avoid further DB calls.
    if (notifications.length < 1) {
      return [];
    }

    // Get the users for which there are notifications
    const users = await this.userService.find(
      notifications.map((n) => ({ Id: n.DestinationUserID })),
    );

    const unsentNotifications = [];

    for (const notification of notifications) {
      const notificationType = notificationTypes.find(
        (t) => t.NotificationTypeID === notification.NotificationType,
      );

      const user = users.find((u) => u.Id === notification.DestinationUserID);

      const { destination, destinationUserName } = await this.getDestination(
        notification,
        user,
      );

      const unsent: IUnsentNotification = {
        NotificationID: notification.NotificationID,
        DestinationUserID: notification.DestinationUserID,
        DateCreated: notification.DateCreated,
        AttachmentName: notificationType.AttachmentName,
        Destination: destination,
        DestinationUserName: destinationUserName,
        HeaderTemplate: notificationType.HeaderTemplate,
        BodyTemplate: notificationType.BodyTemplate,
        AlternativeBodyTemplate: notificationType.AlternativeBodyTemplate,
        DeliveryType: notificationType.DeliveryType as NotificationDeliveryType,
        Values: {},
      };

      unsentNotifications.push(unsent);
    }

    // Mark all the notifications as sending
    await this.notificationService.update(
      notifications.map((n) => ({ ...n, Status: NotificationState.sending })),
    );

    return unsentNotifications;
  }

  private async getDestination(
    notification: NotificationEntity,
    user: UserEntity,
  ): Promise<{ destination: string; destinationUserName: string }> {
    if (notification.ClientContactID > 0) {
      const clientContact = await this.clientContactService.findOne({
        ClientContactID: notification.ClientContactID,
      });

      return {
        destination: clientContact.Email,
        destinationUserName: `${clientContact.FirstName} ${clientContact.LastName}`,
      };
    } else if (notification.DestinationUserID === 'PRODUCT') {
      const sysParam = await this.sysParamService.findOne({
        ParamKey: 'VAR_PRODUCT_EMAIL',
      });
      return {
        destination: sysParam.ParamValue,
        destinationUserName: 'Sky Analytics Team',
      };
    } else if (notification.DestinationUserID === 'SUPPORT') {
      const sysParam = await this.sysParamService.findOne({
        ParamKey: 'VAR_ERROR_EMAIL',
      });
      return {
        destination: sysParam.ParamValue,
        destinationUserName: 'Support',
      };
    } else if (notification.DestinationUserID === 'EVAL_REQUEST') {
      const sysParam = await this.sysParamService.findOne({
        ParamKey: 'EVAL_REQUEST_EMAIL',
      });
      return {
        destination: sysParam.ParamValue,
        destinationUserName: 'EvalDataRequest',
      };
    } else if (!notification.DestinationUserID) {
      const notificationUserGroups =
        await this.notificationDestinationUserGroupService.find({
          NotificationID: notification.NotificationID,
        });

      const users = (await this.userService.findAll())
        .filter(
          (u) =>
            notificationUserGroups.findIndex((nu) => u.Id === nu.UserID) > -1,
        )
        .join(',');
      return { destination: users, destinationUserName: 'Users' };
    } else {
      return { destination: user.Email, destinationUserName: user.FirstName };
    }
  }

  private getSender(deliveryType: NotificationDeliveryType) {
    switch (deliveryType) {
      case NotificationDeliveryType.email:
        return this.emailNotificationSender;
      default:
        throw new Error(
          'Could not create notification sender : Unknown notification type',
        );
    }
  }
}
