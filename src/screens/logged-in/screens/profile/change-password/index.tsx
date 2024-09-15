import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';
import { ChangePasswordModule } from '@modules/logged-in/screens';

import { noop } from 'lodash';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';

const ChangePassword: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.CHANGE_PASSWORD>> = ({ navigation }) => {
  const [call, { loading }] = useLazyAxios({
    method: 'patch',
    url: '/password-reset',
  });

  const service = useTokenService(true);

  const onSubmit = useTryCatch(async (password: { current_password: string; new_password: string }) => {
    const tokenRes = await service.getTokens();

    if (tokenRes) {
      const headers = {
        Authorization: `Bearer ${tokenRes.access_token}`,
      };

      const queryParams = {
        current_password: password.current_password,
        new_password: password.new_password,
      };
      const res = await call(queryParams, noop, { headers });
      if (res) {
        navigation.goBack();
      }
    }
  });
  return (
    <ChangePasswordModule
      loading={loading || service.loading}
      onSubmit={password => {
        onSubmit(password);
      }}
    />
  );
};

export default ChangePassword;
