export interface IAllSubscriptionsResponse {
  page: Page;
  _embedded: Embedded;
  _links: {
    self: { href: string };
  };
}

interface Embedded {
  entityModelList: ISubscription[];
}

export enum SubscriptionDuration {
  WEEK_1 = 'WEEK_1',
  WEEK_2 = 'WEEK_2',
  MONTH_1 = 'MONTH_1',
  MONTH_3 = 'MONTH_3',
  MONTH_6 = 'MONTH_6',
  MONTH_9 = 'MONTH_9',
  MONTH_12 = 'MONTH_12',
}

export interface ISubscription {
  id: number;
  type: string;
  price: number;
  title: string;
  trial: boolean;
  separateBilling: boolean;
  discountData: DiscountData;
  _links: EntityModelListLinks;
  retentionOfferMonths?: number;
  retentionOfferDiscount?: DiscountData;
  subscriptionDuration: SubscriptionDuration;
  subscriptionAccounts?: SubscriptionAccount[];
}

interface EntityModelListLinks {
  self: PurpleSelf;
}

interface PurpleSelf {
  href: string;
  templated: boolean;
}

export interface DiscountData {
  discount: boolean;
  discountType: string;
  discountAmount: number;
}

interface SubscriptionAccount {
  accountId: number;
  termDateTime: string;
  automaticTermExtension: boolean;
}
interface Page {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}
