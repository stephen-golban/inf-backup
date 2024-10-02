import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedOutStackParamList } from './logged-out';
import { LoggedInStackParams } from './logged-in';

enum APP_SCREEN {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
}

type RootStackParamList = {
  [APP_SCREEN.LOGGED_IN]: NavigatorScreenParams<LoggedInStackParams>;
  [APP_SCREEN.LOGGED_OUT]: NavigatorScreenParams<LoggedOutStackParamList>;
};

type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export { APP_SCREEN };
export type { RootStackScreenProps, RootStackParamList };
