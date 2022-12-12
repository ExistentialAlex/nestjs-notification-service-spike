const NotificationType = {
  none: 0,
  evaluationCompleteAllSubsets: 1,
  evaluationCompletePartialSubsets: 2,
  evaluationCompleteNoSubsets: 3,
  newUserConfirmPassword: 4,
  resetPassword: 5,
  campaignPlanRequest: 6,
  newCariaUserConfirmEmail: 7,
  editNonCariaToCariaUserConfirmEmail: 8,
  editCariaToNonCariaUserConfirmEmail: 9,
  newProspectUserConfirmPassword: 10,
  proposalPublishedNotificationEmail: 11,
  supportRequestEmail: 12,
  publishProposalClientNotification: 13,
  accountLockedEmail: 14,
  publishEvalLiteEmail: 15,
  evalLiteMetEmail: 16,
  newProspectUserSignUpConfirmPassword: 18,
  evalLitePermissionEmail: 19,
  supportEmail: 10000,
  evaluationDataRequest: 20000,
  newProspectUserSignedUp: 30000,
} as const;

export type NotificationType =
  typeof NotificationType[keyof typeof NotificationType];
