export interface IAllSubscriptionsResponse {
  page: Page;
  _embedded: Embedded;
  _links: IAllSubscriptionsLinks;
}

interface Embedded {
  entityModelList: EntityModelList[];
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

interface EntityModelList {
  id: number;
  type: string;
  title: string;
  price: number;
  discountData: DiscountData;
  _links: EntityModelListLinks;
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

interface DiscountData {
  discount: boolean;
  discountType: string;
  discountAmount: number;
}

interface SubscriptionAccount {
  accountId: number;
  termDateTime: string;
  automaticTermExtension: boolean;
}

interface IAllSubscriptionsLinks {
  self: FluffySelf;
}

interface FluffySelf {
  href: string;
}

interface Page {
  size: number;
  number: number;
  totalPages: number;
  totalElements: number;
}
