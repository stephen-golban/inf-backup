import React from 'react';

import { WelcomeModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const Welcome: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Welcome>> = props => {
  const { navigation, route } = props;

  const onPressContinue = () => navigation.navigate(LOGGED_OUT_SCREENS.Login);

  return <WelcomeModule onPressContinue={onPressContinue} />;
};

export { Welcome };
