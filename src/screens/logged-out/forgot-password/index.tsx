import React from 'react';

import useForgotPassword from './hooks';
import { ForgotPasswordModule } from '@modules/logged-out';
import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const ForgotPassword: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.ForgotPassword>> = props => {
  const { navigation } = props;
  const { loading, onSubmit } = useForgotPassword(navigation);
  const onPressQuestion = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <ForgotPasswordModule loading={loading} onPressQuestion={onPressQuestion} onSubmit={onSubmit} />;
};

export { ForgotPassword };
