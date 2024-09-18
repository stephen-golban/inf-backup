import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoggedOutStackParamList } from './logged-out';
import { LoggedInStackParams } from './logged-in';
import { PinCodeT } from '@anhnch/react-native-pincode';

enum APP_SCREEN {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',

  // USED ONLY FOR NAVIGATION OBJECT!!!
  PIN_SCREEN = 'PIN_SCREEN',
}

type RootStackParamList = {
  [APP_SCREEN.PIN_SCREEN]: { mode: PinCodeT.Modes };
  [APP_SCREEN.LOGGED_IN]: NavigatorScreenParams<LoggedInStackParams>;
  [APP_SCREEN.LOGGED_OUT]: NavigatorScreenParams<LoggedOutStackParamList>;
};

type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export { APP_SCREEN };
export type { RootStackScreenProps, RootStackParamList };
