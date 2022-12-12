export const NotificationState = {
  none: 0,
  unsent: 1,
  sending: 2,
  sent: 3,
} as const;

export type NotificationState =
  typeof NotificationState[keyof typeof NotificationState];
