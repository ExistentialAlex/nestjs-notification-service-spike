import { INotificationToSend } from './notification-to-send.interface';
import { IUnsentNotification } from './unsent-notifications.interface';

export interface INotificationBuilder {
  buildNotification(
    unsentNotification: IUnsentNotification,
  ): INotificationToSend;
  buildAttachment(attachmentName: string); //Attachment;
}
