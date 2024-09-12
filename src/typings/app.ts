import type { User } from './user';
import type { ThemeType } from '@theme/index';
import type { StageNomenclatureResponse } from './responses/nomenclatures';
import type { LastInquiryApiResponse, PurchasedSubscription } from './responses';

export interface IAppState {
  user: User | null;

  isAuthenticated: boolean;

  subscription: PurchasedSubscription | undefined;

  loadingApp: boolean;

  theme: ThemeType;

  locale: 'en' | 'ru' | 'ro';

  inquiry: LastInquiryApiResponse | undefined;

  nomenclature: StageNomenclatureResponse[] | any;
}

export type Locale = IAppState['locale'];
