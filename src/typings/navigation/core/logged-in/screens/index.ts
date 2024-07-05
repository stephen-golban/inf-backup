import { ProfileStackParams } from './profile';
import { APP_SCREEN, RootStackScreenProps } from '../../index';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export enum LOGGED_IN_SCREENS {
  PROFILE = 'PROFILE',
}

export type LoggedInScreensParams = {
  [LOGGED_IN_SCREENS.PROFILE]: NavigatorScreenParams<ProfileStackParams>;
};

export type LoggedInScreensProps<T extends keyof LoggedInScreensParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInScreensParams, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;
