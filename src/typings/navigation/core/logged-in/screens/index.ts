import { ProfileStackParams } from './profile';
import { APP_SCREEN, RootStackScreenProps } from '../../index';

import { OwnDataCheckScreensParamList } from './own-data-check';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { FeedbackStackParams } from './feedback';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExecutePaymentBodyArgs } from '@typings/responses';
import { LOGGED_IN_STACK, LoggedInStackProps } from '../index';

export enum LOGGED_IN_SCREENS {
  PROFILE = 'PROFILE',
  FEEDBACK = 'FEEDBACK',
  OWN_DATA_CHECK = 'OWN_DATA_CHECK',
  PAYMENT = 'PAYMENT',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
}

export enum PAYMENT_SCREENS {
  CARDS = 'CARDS',
  ORDER = 'ORDER',
}

export type PaymentStackParamList = {
  [PAYMENT_SCREENS.CARDS]: Omit<ExecutePaymentBodyArgs, 'billerId'>;
  [PAYMENT_SCREENS.ORDER]: (Partial<ExecutePaymentBodyArgs> & { isReport?: boolean }) | undefined;
};

export type PaymentStackScreenProps<T extends keyof PaymentStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<PaymentStackParamList, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;

export enum SUBSCRIPTIONS_SCREENS {
  INDEX = 'INDEX',
  TRIAL_EXTEND = 'TRIAL_EXTEND',
  CANCEL_FEEDBACK = 'CANCEL_FEEDBACK',
  CANCEL_STAY = 'CANCEL_STAY',
}

export type SubscriptionsStackParams = {
  [SUBSCRIPTIONS_SCREENS.INDEX]: undefined;
  [SUBSCRIPTIONS_SCREENS.TRIAL_EXTEND]: undefined;
  [SUBSCRIPTIONS_SCREENS.CANCEL_FEEDBACK]: undefined;
  [SUBSCRIPTIONS_SCREENS.CANCEL_STAY]: undefined;
};

export type SubscriptionsStackScreenProps<T extends keyof SubscriptionsStackParams> = CompositeScreenProps<
  NativeStackScreenProps<SubscriptionsStackParams, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;

export type LoggedInScreensParams = {
  [LOGGED_IN_SCREENS.PROFILE]: NavigatorScreenParams<ProfileStackParams>;
  [LOGGED_IN_SCREENS.FEEDBACK]: NavigatorScreenParams<FeedbackStackParams>;
  [LOGGED_IN_SCREENS.OWN_DATA_CHECK]: NavigatorScreenParams<OwnDataCheckScreensParamList>;
  [LOGGED_IN_SCREENS.PAYMENT]: NavigatorScreenParams<PaymentStackParamList>;
  [LOGGED_IN_SCREENS.SUBSCRIPTIONS]: NavigatorScreenParams<SubscriptionsStackParams>;
};

export type LoggedInScreensProps<T extends keyof LoggedInScreensParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInScreensParams, T>,
  LoggedInStackProps<LOGGED_IN_STACK.SCREENS>
>;
