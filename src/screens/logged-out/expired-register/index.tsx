import React from 'react';

import { useGoBack } from '@library/hooks';

import { ExpiredRegisterModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const ExpiredRegister: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.ExpiredRegister>> = props => {
  const { navigation } = props;

  useGoBack(true, navigation.goBack);

  const onPressContinue = () => navigation.navigate(LOGGED_OUT_SCREENS.Register);

  return <ExpiredRegisterModule onPressRegister={onPressContinue} />;
};

export { ExpiredRegister };
