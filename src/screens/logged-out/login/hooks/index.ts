import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { setAppIsAuthenticated } from '@store/app';

import * as Keychain from 'react-native-keychain';

import type { LoginFormFields } from '@modules/logged-out/login/resolver';
import type { LoginApiResponse } from '@typings/responses/login';

export default function useLoginScreen() {
  const [call, { loading, data }] = useLazyAxios<LoginApiResponse>({
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

    await call(queryParams);
    if (data) {
      const { access_token, refresh_token } = data;
      await Keychain.setInternetCredentials('accessToken', 'user', access_token);
      await Keychain.setInternetCredentials('refreshToken', 'user', refresh_token);
      setAppIsAuthenticated(true);
    }
  });

  return { loading, onSubmit };
}
