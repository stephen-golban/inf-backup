import type { CompositeScreenProps } from '@react-navigation/native';
import { LoggedInScreensParams, LoggedInScreensProps } from './index';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum OWN_DATA_CHECK_SCREENS {
  NewCredit = 'NewCredit',
  WhoCheckCredit = 'WhoCheckCredit',
}

export type OwnDataCheckScreensParamList = {
  [OWN_DATA_CHECK_SCREENS.NewCredit]: undefined;
  [OWN_DATA_CHECK_SCREENS.WhoCheckCredit]: undefined;
};

export type OwnDataCheckScreenProps<T extends keyof OwnDataCheckScreensParamList> = CompositeScreenProps<
  NativeStackScreenProps<OwnDataCheckScreensParamList, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;
