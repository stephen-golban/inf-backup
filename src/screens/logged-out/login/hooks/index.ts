import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { usePinCodeStore } from '@store/pin-code';
import { useMMKVString } from 'react-native-mmkv';
import { useDeviceInfoService } from '@services/device-info';

import { AppStorage, loadString, remove } from '@library/storage';
import * as Keychain from 'react-native-keychain';

import { MMKV_KEY, PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';

import type { LoginApiResponse } from '@typings/responses/login';
import type { LoginFormFields } from '@modules/logged-out/login/resolver';
import { type LoggedOutStackScreenProps, LOGGED_OUT_SCREENS } from '@typings/navigation';
import { setAppIsAuthenticated } from '@store/app';

export default function useLoginScreen({ navigation }: Pick<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Login>, 'navigation'>) {
  const service = useDeviceInfoService();
  const [pin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const [call, { loading: loginLoading }] = useLazyAxios<LoginApiResponse>({
    method: 'post',
    axiosInstance: auth_api,
    url: '/auth/oauth/token',
  });

  const onSubmit = useTryCatch(async (values: LoginFormFields) => {
    const queryParams = {
      grant_type: 'password',
      username: '+373' + values.phone,
      password: values.password,
    };

    await call(queryParams, async res => {
      const { access_token, refresh_token } = res;
      await Keychain.setInternetCredentials('accessToken', 'user', access_token);
      await Keychain.setInternetCredentials('refreshToken', 'user', refresh_token);
      if (loadString(MMKV_KEY.DEVICE_TOKEN)) {
        await service.saveDeviceToken().then(() => remove(MMKV_KEY.DEVICE_TOKEN));
      }
      setAppIsAuthenticated(true);

      if (pin) {
        return usePinCodeStore.setState({ visible: true, mode: PinCodeT.Modes.Enter });
      }
      return usePinCodeStore.setState({ visible: true, mode: PinCodeT.Modes.Set });
    });
  });

  const loading = loginLoading || service.loading;

  return { loading, onSubmit };
}
