import type { ISubscription } from '@typings/responses';

export type SelectedPlan = {
  id: number;
  price: number;
  discount: number;
};

export type RenderedSubscription = Pick<ISubscription, 'id' | 'price'> & {
  plan: string;
  discount: number;
  isActive: boolean;
  isPremium: boolean;
  calculatedPrice: number;
};

export type RenderedPlans = Record<
  string,
  Pick<RenderedSubscription, 'id' | 'price' | 'isActive' | 'discount'> & {
    name: string;
    features: {
      title: string;
      disabled: boolean;
      hasInfo: boolean;
      tag: string | undefined;
    }[];
  }
>;
