import { LOGGED_IN_SCREENS, LoggedInScreensProps } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export enum PROFILE_SCREENS {
  'FAQ' = 'FAQ',
  'CONTACTS' = 'CONTACTS',
  'SECTIONS' = 'SECTIONS',
  'SETTINGS' = 'SETTINGS',
  'MY_ACCOUNT' = 'MY_ACCOUNT',
  'NOTIFICATIONS' = 'NOTIFICATIONS',
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
  [PROFILE_SCREENS.NOTIFICATIONS]: undefined;
  [PROFILE_SCREENS.INVITE_FRIENDS]: undefined;
  [PROFILE_SCREENS.DELETE_ACCOUNT]: undefined;
  [PROFILE_SCREENS.CHANGE_PASSWORD]: undefined;
  [PROFILE_SCREENS.CHANGE_PASSWORD]: undefined;
  [PROFILE_SCREENS.INVITE_FRIENDS_FORM]: undefined;
  [PROFILE_SCREENS.SETTINGS]: NavigatorScreenParams<SettingsStackParams>;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParams> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParams, T>,
  LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>
>;

export enum SETTINGS_SCREENS {
  SECTIONS = 'SECTIONS',
  PAYMENTS_MANAGEMENT = 'PAYMENTS_MANAGEMENT',
  TECHNICAL_FEEDBACK = 'TECHNICAL_FEEDBACK',
}

export type SettingsStackParams = {
  [SETTINGS_SCREENS.SECTIONS]: undefined;
  [SETTINGS_SCREENS.PAYMENTS_MANAGEMENT]: undefined;
  [SETTINGS_SCREENS.TECHNICAL_FEEDBACK]: undefined;
};

export type SettingsStackScreenProps<T extends keyof SettingsStackParams> = CompositeScreenProps<
  NativeStackScreenProps<SettingsStackParams, T>,
  ProfileStackScreenProps<PROFILE_SCREENS.SETTINGS>
>;
