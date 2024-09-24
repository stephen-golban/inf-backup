import type { ISubscription } from '@typings/responses';

export type SelectedPlan = {
  id: number;
  price: number;
  discount: number;
  isAnnual: boolean;
};

export type RenderedSubscription = Pick<ISubscription, 'id' | 'price'> & {
  plan: string;
  discount: number;
  isAnnual: boolean;
  isActive: boolean;
  isPremium: boolean;
  calculatedPrice: number;
};

export type RenderedPlans = Record<
  string,
  Pick<RenderedSubscription, 'id' | 'price' | 'isAnnual' | 'isActive' | 'discount'> & {
    name: string;
    features: {
      title: string;
      disabled: boolean;
      hasInfo: boolean;
      tag: string | undefined;
    }[];
  }
>;
