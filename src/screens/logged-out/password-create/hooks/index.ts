import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';
import { noop } from 'lodash';

import { MMKV_KEY } from '@library/constants';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';
import { PasswordCreateFormFields } from '@modules/logged-out/password-create/resolver';

import { loadString, remove, saveString } from '@library/storage';
import { useDeviceInfoService } from '@services/device-info';
import { isEmulator } from '@library/method';

export default function usePasswordCreate(
  navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.CreatePassword>['navigation'],
  otp: string,
) {
  const service = useTokenService(true);
  const { deviceInfo } = useDeviceInfoService();

  const [call, { loading: registerLoading }] = useLazyAxios<any>({
    method: 'patch',
    url: '/password-reset',
  });

  const onSubmit = useTryCatch(async (values: PasswordCreateFormFields) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = {
        token: null,
        otp,
        phoneNr: loadString(MMKV_KEY.SEND_TO),
        newPassword: values.password,
      };
      const res = await call(queryParams, noop, { headers });
      if (res) {
        remove(MMKV_KEY.INSERT_OTP);
        if (await isEmulator()) {
          saveString(MMKV_KEY.DEVICE_TOKEN, deviceInfo?.deviceToken || '');
        }
        navigation.navigate(LOGGED_OUT_SCREENS.SuccessRegister);
      }
    }
  });

  const loading = registerLoading || service.loading;

  return { loading, onSubmit };
}
