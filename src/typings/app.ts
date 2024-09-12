import type { User } from './user';
import type { ThemeType } from '@theme/index';
import type { PurchasedSubscription } from './responses';
import type { StageNomenclatureResponse } from './responses/nomenclatures';

export interface IAppState {
  user: User | null;

  isAuthenticated: boolean;

  subscription: PurchasedSubscription | undefined;

  loadingApp: boolean;

  theme: ThemeType;

  locale: 'en' | 'ru' | 'ro';

  nomenclature: StageNomenclatureResponse[] | any;
}

export type Locale = IAppState['locale'];
