import { ProfileStackParams } from './profile';
import { APP_SCREEN, RootStackScreenProps } from '../../index';

import { OwnDataCheckScreensParamList } from './own-data-check';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export enum LOGGED_IN_SCREENS {
  PROFILE = 'PROFILE',
  OWN_DATA_CHECK = 'OWN_DATA_CHECK',
}

export type LoggedInScreensParams = {
  [LOGGED_IN_SCREENS.PROFILE]: NavigatorScreenParams<ProfileStackParams>;
  [LOGGED_IN_SCREENS.OWN_DATA_CHECK]: NavigatorScreenParams<OwnDataCheckScreensParamList>;
};

export type LoggedInScreensProps<T extends keyof LoggedInScreensParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInScreensParams, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;
