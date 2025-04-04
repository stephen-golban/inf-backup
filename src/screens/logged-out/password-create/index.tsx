import React from 'react';

import usePasswordCreate from './hooks';

import { PasswordCreateModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const PasswordCreate: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.CreatePassword>> = props => {
  const { navigation, route } = props;
  const { otp } = route.params;

  const { loading, onSubmit } = usePasswordCreate(navigation, otp);

  return <PasswordCreateModule loading={loading} onSubmit={onSubmit} />;
};

export { PasswordCreate };
