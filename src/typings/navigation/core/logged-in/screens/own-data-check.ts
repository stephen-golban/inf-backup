import type { CompositeScreenProps } from '@react-navigation/native';
import { LoggedInScreensParams, LoggedInScreensProps } from './index';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICreditReportSummaryResponse } from '@typings/responses';

export enum OWN_DATA_CHECK_SCREENS {
  NewCredit = 'NewCredit',
  WhoCheckCredit = 'WhoCheckCredit',
  CreditReportSummary = 'CreditReportSummary',
}

export type OwnDataCheckScreensParamList = {
  [OWN_DATA_CHECK_SCREENS.NewCredit]: undefined;
  [OWN_DATA_CHECK_SCREENS.WhoCheckCredit]: undefined;
  [OWN_DATA_CHECK_SCREENS.CreditReportSummary]: { data: ICreditReportSummaryResponse } | undefined;
};

export type OwnDataCheckScreenProps<T extends keyof OwnDataCheckScreensParamList> = CompositeScreenProps<
  NativeStackScreenProps<OwnDataCheckScreensParamList, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;
