import React from 'react';

import useLoginScreen from './hooks';

import { LoginModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const Login: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Login>> = props => {
  const { navigation } = props;

  const { loading, onSubmit } = useLoginScreen();

  const onPressRegister = () => navigation.navigate(LOGGED_OUT_SCREENS.Register);
  const onPressForgotPassword = () => navigation.navigate(LOGGED_OUT_SCREENS.ForgotPassword);

  return (
    <LoginModule onPressForgotPassword={onPressForgotPassword} onPressRegister={onPressRegister} onSubmit={onSubmit} loading={loading} />
  );
};

export { Login };
