import { CompositeScreenProps } from '@react-navigation/native';
import { LOGGED_IN_SCREENS, LoggedInScreensProps } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum SUBSCRIPTIONS_SCREENS {
  INDEX = 'INDEX',
  STAY = 'STAY',
  REASON = 'REASON',
  REMOVE = 'REMOVE',
  TELL_US_MORE = 'TELL_US_MORE',
}

export enum Reason {
  'REMOVE_ACCOUNT' = 'REMOVE_ACCOUNT',
  'CANCEL_SUBSCRIPTION' = 'CANCEL_SUBSCRIPTION',
}

export type SubscriptionsStackParams = {
  [SUBSCRIPTIONS_SCREENS.INDEX]: undefined;
  [SUBSCRIPTIONS_SCREENS.TELL_US_MORE]: { reason: Reason };
  [SUBSCRIPTIONS_SCREENS.STAY]: { comment: string; reason: Reason };
  [SUBSCRIPTIONS_SCREENS.REASON]: { reason: Reason };
  [SUBSCRIPTIONS_SCREENS.REMOVE]: { comment: string; reason: Reason };
};

export type SubscriptionsStackScreenProps<T extends keyof SubscriptionsStackParams> = CompositeScreenProps<
  NativeStackScreenProps<SubscriptionsStackParams, T>,
  LoggedInScreensProps<LOGGED_IN_SCREENS.SUBSCRIPTIONS>
>;
