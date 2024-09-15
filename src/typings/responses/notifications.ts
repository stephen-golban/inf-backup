export interface INotificationsResponse {
  notifications: Notification[];
  pageDetails: PageDetails;
}

export interface Notification {
  channelType: string;
  message: string;
  notificationAddress: string;
  notificationType: string;
  requestedAt: string;
}

export interface PageDetails {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
