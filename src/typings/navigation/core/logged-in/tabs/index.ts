import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { LOGGED_IN_STACK, LoggedInStackProps } from '..';

export enum LOGGED_IN_TABS {
  HOME = 'HOME',
}

export type LoggedInTabsParams = {
  [LOGGED_IN_TABS.HOME]: undefined;
};

export type LoggedInTabsProps<T extends keyof LoggedInTabsParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInTabsParams, T>,
  LoggedInStackProps<LOGGED_IN_STACK.SCREENS>
>;
