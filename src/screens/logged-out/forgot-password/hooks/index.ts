import { useLazyAxios } from '@api/hooks';
import { TokensApiResponse } from '@typings/responses';
import { useTokenService } from '@services/tokens';
import { useTryCatch } from '@library/hooks';
import { saveString } from '@library/storage';
import { MMKV_KEY } from '@library/constants';
import { LOGGED_OUT_SCREENS } from '@typings/navigation';
import { noop } from 'lodash';

const useForgotPassword = (navigation: any) => {
  const [sendOTP, { loading: sendOTPLoading }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    url: '/password-reset/otp',
  });

  const service = useTokenService(true);

  const onSubmit = useTryCatch(async values => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };

      const queryParams = {
        otpNotificationType: values.selected_type === '✉️   EMAIL' ? 'EMAIL' : 'SMS',
        sendTo: values.selected_type === '✉️   EMAIL' ? values.email || '' : '+373' + values.phone || '',
      };

      await sendOTP(queryParams, noop, { headers });
      saveString(MMKV_KEY.SEND_TO, values.selected_type === '✉️   EMAIL' ? values.email || '' : '+373' + values.phone || '');

      navigation.navigate(LOGGED_OUT_SCREENS.OneTimePassword, {
        sentTo: values.selected_type === '✉️   EMAIL' ? values.email || '' : '+373' + values.phone || '',
        otpNotificationType: values.selected_type === '✉️   EMAIL' ? 'EMAIL' : 'SMS',
      });
    }
  });

  return {
    sendOTP,
    sendOTPLoading,
    onSubmit,
  };
};

export default useForgotPassword;
