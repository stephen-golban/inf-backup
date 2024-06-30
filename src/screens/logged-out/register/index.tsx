import React from 'react';

import { RegisterModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const Register: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Register>> = props => {
  const { navigation } = props;

  const onPressLogin = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <RegisterModule onPressLogin={onPressLogin} onSubmit={onPressLogin} />;
};

export { Register };
