import React from 'react';

import useOneTimePassword from './hooks';
import { OneTimePasswordModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigation';

const OneTimePassword: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.OneTimePassword>> = props => {
  const { navigation, route } = props;

  const { loading, onSubmit, onResendPassword, resendCodeLoading } = useOneTimePassword(
    navigation,
    route.params?.sentTo,
    route.params?.otpNotificationType as 'SMS' | 'EMAIL' | undefined,
  );

  return (
    <OneTimePasswordModule loading={loading} resendCodeLoading={resendCodeLoading} onResendCode={onResendPassword} onSubmit={onSubmit} />
  );
};

export { OneTimePassword };
