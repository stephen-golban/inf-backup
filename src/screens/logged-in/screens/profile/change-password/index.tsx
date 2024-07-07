import { useLazyAxios } from '@api/hooks';
import { ChangePasswordModule } from '@modules/logged-in/screens';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';

const ChangePassword: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.CHANGE_PASSWORD>> = ({ navigation }) => {
  const [call, { loading }] = useLazyAxios({
    method: 'patch',
    url: '/password-reset',
  });
  return (
    <ChangePasswordModule
      loading={loading}
      onSubmit={password => {
        call(password);
      }}
    />
  );
};

export default ChangePassword;
