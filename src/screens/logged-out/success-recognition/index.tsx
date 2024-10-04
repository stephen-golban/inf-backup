import React from 'react';

import { useGoBack } from '@library/hooks';

import { SuccessRecognitionModule } from '@modules/logged-out';

import { saveString } from '@library/storage';
import { MMKV_KEY } from '@library/constants';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const SuccessRecognition: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.SuccessRecognition>> = props => {
  const { navigation, route } = props;

  useGoBack(true, navigation.goBack);

  const onPressContinue = () => {
    // saveString(MMKV_KEY.INSERT_OTP, '1');
    navigation.navigate(LOGGED_OUT_SCREENS.OneTimePassword, {
      sentTo: route?.params?.sentTo,
      otpNotificationType: route?.params?.otpNotificationType,
    });
  };

  return <SuccessRecognitionModule onPressContinue={onPressContinue} />;
};

export { SuccessRecognition };
