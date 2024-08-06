import { CompositeScreenProps } from '@react-navigation/native';
import { LOGGED_IN_SCREENS, LoggedInScreensProps } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum PROFILE_SCREENS {
  'FAQ' = 'FAQ',
  'CONTACTS' = 'CONTACTS',
  'SECTIONS' = 'SECTIONS',
  'MY_ACCOUNT' = 'MY_ACCOUNT',
  'DELETE_ACCOUNT' = 'DELETE_ACCOUNT',
  'INVITE_FRIENDS' = 'INVITE_FRIENDS',
  'CHANGE_PASSWORD' = 'CHANGE_PASSWORD',
  'INVITE_FRIENDS_FORM' = 'INVITE_FRIENDS_FORM',
}

export type ProfileStackParams = {
  [PROFILE_SCREENS.FAQ]: undefined;
  [PROFILE_SCREENS.CONTACTS]: undefined;
  [PROFILE_SCREENS.SECTIONS]: undefined;
  [PROFILE_SCREENS.MY_ACCOUNT]: undefined;
  [PROFILE_SCREENS.INVITE_FRIENDS]: undefined;
  [PROFILE_SCREENS.DELETE_ACCOUNT]: undefined;
  [PROFILE_SCREENS.CHANGE_PASSWORD]: undefined;
  [PROFILE_SCREENS.INVITE_FRIENDS_FORM]: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParams> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParams, T>,
  LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>
>;
