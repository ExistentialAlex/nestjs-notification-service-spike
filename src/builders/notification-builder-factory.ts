import { NotificationDeliveryType } from '../enums';
import { EmailNotificationBuilder } from './email-notification.builder';

export const NotificationBuilderFactory = {
  getBuilder(deliveryType: NotificationDeliveryType) {
    switch (deliveryType) {
      case NotificationDeliveryType.email:
        return new EmailNotificationBuilder();
      default:
        throw new Error(
          'Could not create notification builder : Unknown notification type',
        );
    }
  },
};
