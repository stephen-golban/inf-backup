import React from 'react';

import { PasswordCreateModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';
import { noop } from 'lodash';

const PasswordCreate: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.CreatePassword>> = props => {
  const { navigation } = props;

  const onPressQuestion = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <PasswordCreateModule onSubmit={noop} />;
};

export { PasswordCreate };
