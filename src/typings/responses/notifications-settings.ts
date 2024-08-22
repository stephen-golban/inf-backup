export type NotificationSettingsApiResponse = {
  sendPushNotifications: boolean;
  contactData: NotificationSettingsContactData[];
};

export type NotificationSettingsContactData = {
  type: 'EMAIL' | 'PHONE';
  value: string;
  invoiceDisplay: boolean;
  invoiceSending: boolean;
  credentialsSending: boolean;
  informationSending: boolean;
};
