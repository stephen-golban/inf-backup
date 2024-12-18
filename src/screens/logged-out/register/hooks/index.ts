import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';

import { saveString } from '@library/storage';
import { MMKV_KEY } from '@library/constants';

import { noop } from 'lodash';
import { createQueryParams } from './util';

import type { RegisterFormFields } from '@modules/logged-out/register/resolver';

import type { RegisterApiResponse } from '@typings/responses/register';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';

export default function useRegisterScreen(
  navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Register | LOGGED_OUT_SCREENS.FaceDetection>['navigation'],
  base64Image: string | null,
) {
  const service = useTokenService();
  const locale = useAppStore(state => state.locale);
  const [call, { loading: registerLoading }] = useLazyAxios<RegisterApiResponse>({
    url: '/admin-api/persons',
    method: 'post',
  });

  const onSubmit = useTryCatch(async (values: RegisterFormFields) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = createQueryParams(values, locale, base64Image);
      const res = await call(queryParams, noop, { headers });
      if (res) {
        if (res) {
          saveString(MMKV_KEY.INSERT_OTP, '1');
          navigation.navigate(LOGGED_OUT_SCREENS.SuccessRecognition, { sentTo: values.phone, otpNotificationType: 'SMS' });
        } else {
          navigation.navigate(LOGGED_OUT_SCREENS.FailedRecognition);
        }
      } else {
        navigation.navigate(LOGGED_OUT_SCREENS.FailedRecognition);
      }
    }
  });

  const loading = registerLoading || service.loading;

  return { loading, onSubmit };
}
