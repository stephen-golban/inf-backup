import { LoggedInTabsParams } from './tabs';
import { LoggedInScreensParams } from './screens';
import { APP_SCREEN, RootStackScreenProps } from '../index';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

enum LOGGED_IN_STACK {
  TABS = 'TABS',
  SCREENS = 'SCREENS',
}

export type LoggedInStackParams = {
  [LOGGED_IN_STACK.TABS]: NavigatorScreenParams<LoggedInTabsParams>;
  [LOGGED_IN_STACK.SCREENS]: NavigatorScreenParams<LoggedInScreensParams>;
};

export { LOGGED_IN_STACK };

export type LoggedInStackProps<T extends keyof LoggedInStackParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInStackParams, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_IN>
>;

export * from './tabs';
export * from './screens';
export * from './screens/profile';
export * from './screens/own-data-check';
