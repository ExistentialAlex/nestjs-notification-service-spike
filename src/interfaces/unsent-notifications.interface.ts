import { NotificationDeliveryType } from '../enums';

export interface IUnsentNotification {
  NotificationID: number;
  DestinationUserID: string;
  Destination: string;
  DestinationUserName: string;
  HeaderTemplate: string;
  BodyTemplate: string;
  AlternativeBodyTemplate: string;
  DateCreated?: Date;
  DateSent?: Date;
  DeliveryType: NotificationDeliveryType;
  AttachmentName: string;
  Values: { [key: string]: string };
}
