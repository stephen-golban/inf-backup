import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { setAppIsAuthenticated } from '@store/app';

import * as Keychain from 'react-native-keychain';

import type { LoginFormFields } from '@modules/logged-out/login/resolver';
import type { LoginApiResponse } from '@typings/responses/login';
import { useMe } from '@services/me';

export default function useLoginScreen() {
  const { getMe, loading: loadingMe } = useMe(false);
  const [call, { loading: loadingLogin }] = useLazyAxios<LoginApiResponse>({
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
      setAppIsAuthenticated(true);
    }).then(getMe);
  });

  const loading = loadingLogin || loadingMe;

  return { loading, onSubmit };
}
