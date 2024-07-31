import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useMMKVString } from 'react-native-mmkv';
import { usePinCodeStore } from '@store/pin-code';

import { AppStorage } from '@library/storage';
import * as Keychain from 'react-native-keychain';

import { PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';

import type { LoginApiResponse } from '@typings/responses/login';
import type { LoginFormFields } from '@modules/logged-out/login/resolver';

export default function useLoginScreen() {
  const [pin] = useMMKVString(PIN_CODE.pin, AppStorage);

  const [call, { loading }] = useLazyAxios<LoginApiResponse>({
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
    }).then(() => {
      if (pin) {
        return usePinCodeStore.setState({
          visible: true,
          mode: PinCodeT.Modes.Enter,
        });
      }
      return usePinCodeStore.setState({ visible: true, mode: PinCodeT.Modes.Set });
    });
  });

  return { loading, onSubmit };
}
