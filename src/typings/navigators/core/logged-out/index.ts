import { APP_SCREEN, RootStackScreenProps } from '../index';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

enum LOGGED_OUT_SCREENS {
  DEFAULT = 'DEFAULT',
}

type LoggedOutStackParamList = {
  [LOGGED_OUT_SCREENS.DEFAULT]: undefined;
};

type LoggedOutStackScreenProps<T extends keyof LoggedOutStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoggedOutStackParamList, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;

export { LOGGED_OUT_SCREENS };
export type { LoggedOutStackParamList, LoggedOutStackScreenProps };
