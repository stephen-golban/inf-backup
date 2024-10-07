import React from 'react';

import useRegisterScreen from './hooks';
import { RegisterModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';
import { RegisterFormFields } from '@modules/logged-out/register/resolver';

const Register: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Register>> = props => {
  const { navigation } = props;

  const onSubmitButton = (values: RegisterFormFields) => navigation.navigate(LOGGED_OUT_SCREENS.CameraPermission, { values });

  const onPressLogin = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <RegisterModule loading={false} onPressLogin={onPressLogin} onSubmit={onSubmitButton} />;
};

export { Register };
