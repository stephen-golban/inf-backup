import type { User } from './user';
import type { ThemeType } from '@theme/index';
import type { StageNomenclatureResponse } from './responses/nomenclatures';
import type {
  CreditReportEventsApiResponse,
  ICreditReportSummaryResponse,
  ICreditScoreResponse,
  PurchasedSubscription,
  LastInquiryApiResponse,
} from './responses';
import { CountryCode } from 'libphonenumber-js/types';

export interface IAppState {
  user: User | null;

  cca2: CountryCode | null;

  isAuthenticated: boolean;

  subscription: PurchasedSubscription | undefined;

  loadingApp: boolean;

  theme: ThemeType;

  isConnected: boolean;

  locale: 'en' | 'ru' | 'ro';

  nomenclature: StageNomenclatureResponse[] | any;
}

export type Locale = IAppState['locale'];

export interface IAppDataCheckState {
  creditScore: ICreditScoreResponse | null;
  inquiry: LastInquiryApiResponse | undefined;
  reportEvents: CreditReportEventsApiResponse | null;
  creditReportSummary: ICreditReportSummaryResponse | null;
}
