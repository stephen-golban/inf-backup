import { APP_SCREEN, RootStackScreenProps } from '../index';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TokensApiResponse } from '@typings/responses/tokens';

enum LOGGED_OUT_SCREENS {
  Welcome = 'Welcome',

  Login = 'Login',

  Register = 'Register',

  SuccessRegister = 'SuccessRegister',

  ExpiredRegister = 'ExpiredRegister',

  CreatePassword = 'CreatePassword',

  ForgotPassword = 'ForgotPassword',

  OneTimePassword = 'OneTimePassword',
}

type LoggedOutStackParamList = {
  [LOGGED_OUT_SCREENS.Welcome]: undefined;

  [LOGGED_OUT_SCREENS.Login]: undefined;

  [LOGGED_OUT_SCREENS.Register]: undefined;

  [LOGGED_OUT_SCREENS.SuccessRegister]: undefined;

  [LOGGED_OUT_SCREENS.ExpiredRegister]: undefined;

  [LOGGED_OUT_SCREENS.CreatePassword]: { token: TokensApiResponse };

  [LOGGED_OUT_SCREENS.ForgotPassword]: undefined;

  [LOGGED_OUT_SCREENS.OneTimePassword]: undefined;
};

type LoggedOutStackScreenProps<T extends keyof LoggedOutStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LoggedOutStackParamList, T>,
  RootStackScreenProps<APP_SCREEN.LOGGED_OUT>
>;

export { LOGGED_OUT_SCREENS };
export type { LoggedOutStackParamList, LoggedOutStackScreenProps };
