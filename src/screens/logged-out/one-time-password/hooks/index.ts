import { noop } from 'lodash';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';

import { OneTimePasswordFormFields } from '@modules/logged-out/one-time-password/resolver';

import { TokensApiResponse } from '@typings/responses/tokens';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';
import { loadString } from '@library/storage';
import { MMKV_KEY } from '@library/constants';

export default function useOneTimePassword(
  navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.OneTimePassword>['navigation'],
  sentTo?: string,
  otpNotificationType?: 'SMS' | 'EMAIL',
) {
  const service = useTokenService(true);

  const [call, { loading: otpLoading }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    url: '/password-reset/otp/validation',
  });

  const [resendCode, { loading: resendCodeLoading }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    url: '/password-reset/otp',
  });

  const onSubmit = useTryCatch(async (values: OneTimePasswordFormFields) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = {
        otpNum: values.code,
        sentTo: loadString(MMKV_KEY.SEND_TO),
      };
      const res = await call(queryParams, noop, { headers });
      if (res) {
        navigation.navigate(LOGGED_OUT_SCREENS.CreatePassword, { token: res, otp: values.code, phoneNr: sentTo || '' });
      }
    }
  });

  const onResendPassword = useTryCatch(async () => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = {
        otpNotificationType: otpNotificationType,
        sendTo: loadString(MMKV_KEY.SEND_TO),
      };
      const res = await resendCode(queryParams, noop, { headers });
    }
  });

  const loading = otpLoading;

  return { loading, onSubmit, onResendPassword, resendCodeLoading };
}
