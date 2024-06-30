import React from 'react';

import { ForgotPasswordModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';
import { noop } from 'lodash';

const ForgotPassword: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.ForgotPassword>> = props => {
  const { navigation } = props;

  const onPressQuestion = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <ForgotPasswordModule onPressQuestion={onPressQuestion} onSubmit={noop} />;
};

export { ForgotPassword };
