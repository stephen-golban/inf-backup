import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useTokenService } from '@services/tokens';
import { ChangePasswordModule } from '@modules/logged-in/screens';

import { noop } from 'lodash';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';

const ChangePassword: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.CHANGE_PASSWORD>> = ({ navigation }) => {
  const [call, { loading }] = useLazyAxios({
    method: 'patch',
    url: '/password-change',
  });

  const onSubmit = useTryCatch(async (password: { current_password: string; new_password: string }) => {
    const queryParams = {
      currentPassword: password.current_password,
      newPassword: password.new_password,
    };
    const res = await call(queryParams);
    if (res) {
      navigation.navigate(PROFILE_SCREENS.SUCCESS_PASSWORD);
    }
  });

  return (
    <ChangePasswordModule
      loading={loading}
      onSubmit={password => {
        onSubmit(password);
      }}
    />
  );
};

export default ChangePassword;
