import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';
import { noop } from 'lodash';

import { MMKV_KEY } from '@library/constants';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';
import { PasswordCreateFormFields } from '@modules/logged-out/password-create/resolver';

import { loadString, remove } from '@library/storage';

export default function usePasswordCreate(
  navigation: LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.CreatePassword>['navigation'],
  otp: string,
) {
  const service = useTokenService(true);

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
        phoneNr: '+373' + loadString(MMKV_KEY.SEND_TO),
        newPassword: values.password,
      };
      const res = await call(queryParams, noop, { headers });
      if (res) {
        remove(MMKV_KEY.INSERT_OTP);
        navigation.navigate(LOGGED_OUT_SCREENS.Login);
      }
    }
  });

  const loading = registerLoading || service.loading;

  return { loading, onSubmit };
}
