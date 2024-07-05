// import { APP_SCREEN, RootStackScreenProps } from '../index';
// import { CompositeScreenProps } from '@react-navigation/native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// enum LOGGED_IN_TABS {
//   HOME = 'HOME',

//   Plus = 'CircularPlus',

//   Like = 'Like',
// }

// type LoggedInTabsParamList = {
//   [LOGGED_IN_TABS.HOME]: undefined;
// };

// type LoggedInTabsScreenProps<T extends keyof LoggedInTabsParamList> = CompositeScreenProps<
//   BottomTabScreenProps<LoggedInTabsParamList, T>,
//   RootStackScreenProps<APP_SCREEN.LOGGED_IN>
// >;

// export { LOGGED_IN_TABS };
// export type { LoggedInTabsParamList, LoggedInTabsScreenProps };

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
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;

export * from './screens';
export * from './tabs';
