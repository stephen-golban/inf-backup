import React from 'react';

import { OneTimePasswordModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';
import { noop } from 'lodash';

const OneTimePassword: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.OneTimePassword>> = props => {
  const { navigation } = props;

  const onPressQuestion = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <OneTimePasswordModule onPressQuestion={onPressQuestion} onSubmit={noop} />;
};

export { OneTimePassword };
