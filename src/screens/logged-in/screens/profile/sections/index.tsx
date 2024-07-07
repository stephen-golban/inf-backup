import React from 'react';
import { noop } from 'lodash';
import { useGoBack } from '@library/hooks';
import { useLogoutService } from '@services/logout';

import { View } from '@components/common';
import { SectionsModule } from '@modules/logged-in';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';

const SectionsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SECTIONS>> = ({ navigation }) => {
  const logout = useLogoutService();
  useGoBack(true, navigation.goBack);
  return (
    <View m="md">
      <SectionsModule
        onEdit={noop}
        onLogout={logout}
        onOpenContacts={noop}
        onOpenSettings={noop}
        onInviteFriends={noop}
        onOpenMyNotitications={noop}
        onOpenMyAccount={() => navigation.navigate(PROFILE_SCREENS.MY_ACCOUNT)}
      />
    </View>
  );
};

export { SectionsScreen };
