import { NotificationDeliveryType } from '../enums';

export const NotificationSenderFactory = {
  getSender(deliveryType: NotificationDeliveryType) {
    switch (deliveryType) {
      case NotificationDeliveryType.email:
        return;
      default:
        throw new Error(
          'Could not create notification sender : Unknown notification type',
        );
    }
  },
};
