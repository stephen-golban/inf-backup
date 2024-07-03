import React from 'react';

import useRegisterScreen from './hooks';
import { RegisterModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const Register: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Register>> = props => {
  const { navigation } = props;

  const { loading, onSubmit } = useRegisterScreen(navigation);

  const onPressLogin = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <RegisterModule loading={loading} onPressLogin={onPressLogin} onSubmit={onSubmit} />;
};

export { Register };
