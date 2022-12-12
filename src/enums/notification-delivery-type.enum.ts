export const NotificationDeliveryType = {
  none: 0,
  email: 1,
} as const;

export type NotificationDeliveryType =
  typeof NotificationDeliveryType[keyof typeof NotificationDeliveryType];
