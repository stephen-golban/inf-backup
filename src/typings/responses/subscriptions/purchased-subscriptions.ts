export type SubscriptionInfo = {
  name?: string;
  price?: number;
  nextPayment?: string;
  trial: boolean;
  subscriptionId?: string | number;
  subscriptionDuration?: SubscriptionDuration;
};

enum SubscriptionDuration {
  WEEK_1 = 'WEEK_1',
  WEEK_2 = 'WEEK_2',
  MONTH_1 = 'MONTH_1',
  MONTH_3 = 'MONTH_3',
  MONTH_6 = 'MONTH_6',
  MONTH_9 = 'MONTH_9',
  MONTH_12 = 'MONTH_12',
}

export interface PurchasedSubscriptionsResponse {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}

interface Embedded {
  entityModelList: PurchasedSubscription[];
}

export interface PurchasedSubscription {
  id: number;
  title: string;
  price: number;
  separateBilling: boolean;
  discountData: DiscountData;
  type: string;
  subscriptionDuration: SubscriptionDuration;
  subscriptionAccounts: SubscriptionAccount[];
  trial: boolean;
  _links: Links;
}

interface DiscountData {
  discount: boolean;
  discountType: string;
  discountAmount: number;
}

interface SubscriptionAccount {
  accountId: number;
  automaticTermExtension: boolean;
  termDateTime: string;
  reservedSubscriptionId: any;
}

interface Links {
  self: Self;
}

interface Self {
  href: string;
  templated: boolean;
}

interface Links2 {
  self: Self2;
}

interface Self2 {
  href: string;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
