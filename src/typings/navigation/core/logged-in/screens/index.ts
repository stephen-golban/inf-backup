import { ProfileStackParams } from './profile';
import { APP_SCREEN, RootStackScreenProps } from '../../index';

import { OwnDataCheckScreensParamList } from './own-data-check';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { FeedbackStackParams } from './feedback';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ExecutePaymentBodyArgs } from '@typings/responses';

export enum LOGGED_IN_SCREENS {
  PROFILE = 'PROFILE',
  FEEDBACK = 'FEEDBACK',
  OWN_DATA_CHECK = 'OWN_DATA_CHECK',
  PAYMENT = 'PAYMENT',
}

export enum PAYMENT_SCREENS {
  CARDS = 'CARDS',
  ORDER = 'ORDER',
}

export type PaymentStackParamList = {
  [PAYMENT_SCREENS.CARDS]: Omit<ExecutePaymentBodyArgs, 'billerId'>;
  [PAYMENT_SCREENS.ORDER]: ExecutePaymentBodyArgs | undefined;
};

export type PaymentStackScreenProps<T extends keyof PaymentStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<PaymentStackParamList, T>,
  LoggedInScreensProps<keyof LoggedInScreensParams>
>;

export type LoggedInScreensParams = {
  [LOGGED_IN_SCREENS.PROFILE]: NavigatorScreenParams<ProfileStackParams>;
  [LOGGED_IN_SCREENS.FEEDBACK]: NavigatorScreenParams<FeedbackStackParams>;
  [LOGGED_IN_SCREENS.OWN_DATA_CHECK]: NavigatorScreenParams<OwnDataCheckScreensParamList>;
  [LOGGED_IN_SCREENS.PAYMENT]: NavigatorScreenParams<PaymentStackParamList>;
};

export type LoggedInScreensProps<T extends keyof LoggedInScreensParams> = CompositeScreenProps<
  BottomTabScreenProps<LoggedInScreensParams, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;
