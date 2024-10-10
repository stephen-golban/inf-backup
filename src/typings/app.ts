import type { User } from './user';
import type { ThemeType } from '@theme/index';
import type { StageNomenclatureResponse } from './responses/nomenclatures';
import type {
  CreditReportEventsApiResponse,
  ICreditReportSummaryResponse,
  ICreditScoreResponse,
  ISubscription,
  LastInquiryApiResponse,
} from './responses';

export interface IAppState {
  user: User | null;

  isAuthenticated: boolean;

  subscription: ISubscription | undefined;

  loadingApp: boolean;

  theme: ThemeType;

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
