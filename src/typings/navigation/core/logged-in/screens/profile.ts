import { CompositeScreenProps } from '@react-navigation/native';
import { LOGGED_IN_SCREENS, LoggedInScreensProps } from './index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum PROFILE_SCREENS {
  'SECTIONS' = 'SECTIONS',
}

export type ProfileStackParams = {
  [PROFILE_SCREENS.SECTIONS]: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParams> = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParams, T>,
  LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>
>;
