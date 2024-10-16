import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useLoginService } from '@services/login';
import { openBrowserAuthAsync } from '@library/method';

import type { LoginApiResponse } from '@typings/responses/login';
import type { LoginFormFields } from '@modules/logged-out/login/resolver';

export default function useLoginScreen() {
  const { onRequestSuccess, service } = useLoginService();
  const [call, { loading: loginLoading }] = useLazyAxios<LoginApiResponse>({
    method: 'post',
    axiosInstance: auth_api,
    url: '/auth/oauth/token',
  });

  const [mpassLogin, { loading: mpassLoading, cancel }] = useLazyAxios('/mpass/request/login', { method: 'post' });

  const onSubmit = useTryCatch(async (values: LoginFormFields) => {
    const queryParams = {
      grant_type: 'password',
      username: '+373' + values.phone,
      password: values.password,
    };

    await call(queryParams, onRequestSuccess);
  });

  const onPressMpass = useTryCatch(async () => {
    await mpassLogin(
      undefined,
      async (data, status, finalUrl) => {
        if (finalUrl) {
          const res = await openBrowserAuthAsync(finalUrl, 'infodebit://mpass');
          if (res && res.type === 'success') {
            const decodedUrl = decodeURIComponent(res.url);
            const tokenString = decodedUrl.split('token=')[1];
            const tokenData = JSON.parse(tokenString);
            return await onRequestSuccess(tokenData);
          }
        }
        return cancel();
      },
      { hasFinalUrl: true },
    );
  });

  const loading = loginLoading || service.loading;

  return { loading, onSubmit, onPressMpass, mpassLoading };
}
