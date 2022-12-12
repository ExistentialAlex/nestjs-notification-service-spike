import { INotificationToSend } from './notification-to-send.interface';

export interface INotificationSender {
  sendNotification(notification: INotificationToSend, buildAttachment): void;
}
