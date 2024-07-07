export type PurchasedSubscriptionsResponse = {
  page: Page;
  _embedded: Embedded;
  _links: PurchasedSubscriptionsLinks;
};

type Embedded = {
  entityModelList: EntityModelList[];
};

export type SubscriptionInfo = {
  name?: string;
  price?: number;
  nextPayment?: string;
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

type EntityModelList = {
  id: number;
  type: string;
  title: string;
  price: number;
  separateBilling: boolean;
  discountData: DiscountData;
  _links: EntityModelListLinks;
  subscriptionDuration: SubscriptionDuration;
  subscriptionAccounts: SubscriptionAccount[];
};

type EntityModelListLinks = {
  self: PurpleSelf;
};

type PurpleSelf = {
  href: string;
  templated: boolean;
};

type DiscountData = {
  discount: boolean;
  discountType: string;
  discountAmount: number;
};

type SubscriptionAccount = {
  accountId: number;
  termDateTime: string;
  automaticTermExtension: boolean;
};

type PurchasedSubscriptionsLinks = {
  self: FluffySelf;
};

type FluffySelf = {
  href: string;
};

type Page = {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
};
