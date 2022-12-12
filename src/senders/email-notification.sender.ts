import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IAttachment } from '../interfaces/attachment.interface';
import { INotificationToSend } from '../interfaces/notification-to-send.interface';
import { INotificationSender } from '../interfaces/notification-sender.interface';

@Injectable()
export class EmailNotificationSender implements INotificationSender {
  constructor(private mailerService: MailerService) {}

  async sendNotification(
    notification: INotificationToSend,
    buildAttachment: IAttachment,
  ): Promise<void> {
    if (!notification.DestinationAddress) {
      throw new Error('No destination address provided');
    }

    await this.mailerService.sendMail({
      to: notification.DestinationAddress.replace(';', ','),
      subject: notification.MessageHeader,
      text: notification.MessageBodyAlternative,
      html: notification.MessageBody,
      attachments: buildAttachment ? [buildAttachment] : [],
    });
  }
}
