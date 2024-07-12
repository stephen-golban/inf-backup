import { PurchasedSubscriptionsResponse } from './responses';
import { StageNomenclatureResponse } from './responses/nomenclatures';
import type { User } from './user';
import type { ThemeType } from '@theme/index';

export interface IAppState {
  user: User | null;

  isAuthenticated: boolean;

  subscription: PurchasedSubscriptionsResponse['_embedded']['entityModelList'][number] | undefined;

  loadingApp: boolean;

  theme: ThemeType;

  locale: 'en' | 'ru' | 'ro';

  nomenclature: StageNomenclatureResponse[] | any;
}
