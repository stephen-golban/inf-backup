import type { CompositeScreenProps } from '@react-navigation/native';
import { LoggedInScreensParams, LoggedInScreensProps } from './index';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICreditReportSummaryResponse, ICreditScoreResponse } from '@typings/responses';

export enum OWN_DATA_CHECK_SCREENS {
  NewCredit = 'NewCredit',
  WhoCheckCredit = 'WhoCheckCredit',
  ScoringDetails = 'ScoringDetails',
  CreditReportSummary = 'CreditReportSummary',
  CreditReportOrder = 'CreditReportOrder',
}

export type OwnDataCheckScreensParamList = {
  [OWN_DATA_CHECK_SCREENS.NewCredit]: undefined;
  [OWN_DATA_CHECK_SCREENS.WhoCheckCredit]: undefined;
  [OWN_DATA_CHECK_SCREENS.CreditReportSummary]: { data: ICreditReportSummaryResponse } | undefined;
  [OWN_DATA_CHECK_SCREENS.ScoringDetails]: { data: ICreditScoreResponse } | undefined;
  [OWN_DATA_CHECK_SCREENS.CreditReportOrder]: undefined;
};

export type OwnDataCheckScreenProps<T extends keyof OwnDataCheckScreensParamList> = CompositeScreenProps<
  NativeStackScreenProps<OwnDataCheckScreensParamList, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;
