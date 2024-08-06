import { CompositeScreenProps } from '@react-navigation/native';
import { LOGGED_IN_SCREENS, LoggedInScreensProps } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum FEEDBACK_SCREENS {
  'STAY' = 'STAY',
  'REASON' = 'REASON',
  'REMOVE' = 'REMOVE',
  'TELL_US_MORE' = 'TELL_US_MORE',
}
export enum Reason {
  'REMOVE_ACCOUNT' = 'REMOVE_ACCOUNT',
  'CANCEL_SUBSCRIPTION' = 'CANCEL_SUBSCRIPTION',
}

export type FeedbackStackParams = {
  [FEEDBACK_SCREENS.TELL_US_MORE]: { reason: Reason };
  [FEEDBACK_SCREENS.STAY]: { comment: string; reason: Reason };
  [FEEDBACK_SCREENS.REASON]: { reason: Reason };
  [FEEDBACK_SCREENS.REMOVE]: { comment: string; reason: Reason };
};

export type FeedbackStackScreenProps<T extends keyof FeedbackStackParams> = CompositeScreenProps<
  NativeStackScreenProps<FeedbackStackParams, T>,
  LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>
>;
