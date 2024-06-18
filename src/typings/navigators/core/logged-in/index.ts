import { APP_SCREEN, RootStackScreenProps } from '../index';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

enum LOGGED_IN_TABS {
  HOME = 'HOME',
}

type LoggedInTabsParamList = {
  [LOGGED_IN_TABS.HOME]: undefined;
};

type LoggedInTabsScreenProps<T extends keyof LoggedInTabsParamList> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInTabsParamList, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_IN>
>;

export { LOGGED_IN_TABS };
export type { LoggedInTabsParamList, LoggedInTabsScreenProps };
