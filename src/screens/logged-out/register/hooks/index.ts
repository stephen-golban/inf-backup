import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';

import { createQueryParams } from './util';

import type { RegisterApiResponse } from '@typings/responses/register';
import type { RegisterFormFields } from '@modules/logged-out/register/resolver';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';

export default function useRegisterScreen(navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.Register>['navigation']) {
  const service = useTokenService();
  const locale = useAppStore(state => state.locale);
  const [call, { loading: registerLoading }] = useLazyAxios<RegisterApiResponse>({
    method: 'post',
    url: '/admin-api/persons',
  });

  const onSubmit = useTryCatch(async (values: RegisterFormFields) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };
      const queryParams = createQueryParams(values, locale);
      const res = await call(queryParams, { headers });
      if (res) {
        navigation.navigate(LOGGED_OUT_SCREENS.OneTimePassword);
      }
    }
  });

  const loading = registerLoading || service.loading;

  return { loading, onSubmit };
}
