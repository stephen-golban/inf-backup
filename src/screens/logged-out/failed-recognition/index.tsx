import React from 'react';

import { useGoBack } from '@library/hooks';
import { FailedRecognitionModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const FailedRecognition: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.FailedRecognition>> = props => {
  const { navigation } = props;

  useGoBack(true, navigation.goBack);

  const onPressContinue = () => navigation.navigate(LOGGED_OUT_SCREENS.Register);

  return <FailedRecognitionModule onPressContinue={onPressContinue} />;
};

export { FailedRecognition };
