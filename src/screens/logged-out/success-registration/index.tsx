import React from 'react';

import { useGoBack } from '@library/hooks';

import { SuccessRegistrationModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const SuccessRegistration: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.SuccessRegister>> = props => {
  const { navigation } = props;

  useGoBack(true, navigation.goBack);

  const onPressContinue = () => {
    navigation.navigate(LOGGED_OUT_SCREENS.Login);
  };

  return <SuccessRegistrationModule onPressContinue={onPressContinue} />;
};

export { SuccessRegistration };
