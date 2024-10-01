export type SubscriptionInfo = {
  name?: string;
  price?: number;
  nextPayment?: string;
  trial: boolean;
  subscriptionId?: string | number;
  subscriptionDuration?: SubscriptionDuration;
};

export enum SubscriptionDuration {
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
  servicesAccesses: ServiceAccess[];
  trial: boolean;
  extraInquiriesRestriction: boolean; // Nou câmp
  retentionOfferMonths: number; // Nou câmp
  _links: Links;
}

interface ServiceAccess {
  id: number;
  service: string;
  separateBilling: boolean;
  asyncMode: boolean;
  estimationTime: number;
  title: string;
  dayLimit: number;
  access: boolean;
  included: boolean;
  includedRequestsNumber: number;
  prices: Price[];
  extraPrices: Price[];
}

interface Price {
  label: string;
  price: number;
}

interface DiscountData {
  discount: boolean;
  discountType: string | null; // Poate fi `null`
  discountAmount: number;
  annualDiscount: boolean; // Nou câmp
}

interface SubscriptionAccount {
  accountId: number;
  automaticTermExtension: boolean;
  termDateTime: string;
  reservedSubscriptionId: any; // Poate fi `null`, așa că se folosește `any`
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
