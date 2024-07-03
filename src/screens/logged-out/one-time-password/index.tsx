import React from 'react';

import useOneTimePassword from './hooks';
import { OneTimePasswordModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const OneTimePassword: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.OneTimePassword>> = props => {
  const { navigation } = props;

  const { loading, onSubmit } = useOneTimePassword(navigation);

  const onPressQuestion = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <OneTimePasswordModule loading={loading} onResendCode={onPressQuestion} onSubmit={onSubmit} />;
};

export { OneTimePassword };
