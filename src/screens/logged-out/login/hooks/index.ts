import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { saveString } from '@library/storage';
import { useLoginService } from '@services/login';
import { openBrowserAuthAsync } from '@library/method';

import { MMKV_KEY } from '@library/constants';

import type { LoginApiResponse } from '@typings/responses/login';
import type { LoginFormFields } from '@modules/logged-out/login/resolver';

export default function useLoginScreen() {
  const { onRequestSuccess, onMpassRequest, service, mpassTokenLoading } = useLoginService();
  const [call, { loading: loginLoading }] = useLazyAxios<LoginApiResponse>({
    method: 'post',
    axiosInstance: auth_api,
    url: '/auth/oauth/token',
  });

  const [mpassLogin, { loading: mpassLoading, cancel }] = useLazyAxios<string>('/mpass/request/login', { method: 'post' });

  const onSubmit = useTryCatch(async (values: LoginFormFields) => {
    const queryParams = {
      grant_type: 'password',
      username: values.phone,
      password: values.password,
    };

    const res = await call(queryParams);
    if (!res) return;
    return onRequestSuccess(res);
  });

  const onPressMpass = useTryCatch(async () => {
    await mpassLogin(undefined, async finalUrl => {
      if (finalUrl) {
        const res = await openBrowserAuthAsync(finalUrl, '');
        if (res && res.type === 'success') {
          const decodedUrl = decodeURIComponent(res.url);
          const uuid = decodedUrl.split('token=')[1];
          if (uuid) {
            saveString(MMKV_KEY.IS_MPASS_LOGIN, 'true');
            return await onMpassRequest(uuid);
          }
        }
      }
      return cancel();
    });
  });

  const loading = loginLoading || service.loading;

  return { loading, onSubmit, onPressMpass, mpassLoading: mpassTokenLoading || mpassLoading };
}
