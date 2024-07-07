import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';
import { noop } from 'lodash';

import { OneTimePasswordFormFields } from '@modules/logged-out/one-time-password/resolver';

import { TokensApiResponse } from '@typings/responses/tokens';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';

export default function useOneTimePassword(navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.OneTimePassword>['navigation']) {
  const service = useTokenService();

  //temporary fake endpoint
  const [call, { loading: registerLoading }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    url: '/admin-api/otp-code',
  });

  const onSubmit = useTryCatch(async (values: OneTimePasswordFormFields) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = {
        code: values.code,
      };
      const res = await call(queryParams, noop, { headers });
      if (res) {
        navigation.navigate(LOGGED_OUT_SCREENS.CreatePassword, { token: res });
      }
    }
  });

  const loading = registerLoading || service.loading;

  return { loading, onSubmit };
}
