import React from 'react';

import { noop } from 'lodash';
import { useGoBack } from '@library/hooks';
import { useLogoutService } from '@services/logout';

import { SectionsModule } from '@modules/logged-in';

import { PROFILE_SCREENS, type ProfileStackScreenProps } from '@typings/navigation/';

const SectionsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SECTIONS>> = ({ navigation }) => {
  const logout = useLogoutService();
  useGoBack(true, navigation.goBack);

  return (
    <SectionsModule
      onOpenFaq={() => navigation.navigate(PROFILE_SCREENS.FAQ)}
      onEdit={noop}
      onLogout={logout}
      onOpenContacts={() => navigation.navigate(PROFILE_SCREENS.CONTACTS)}
      onOpenSettings={noop}
      onInviteFriends={noop}
      onOpenMyNotitications={noop}
      onOpenMyAccount={() => navigation.navigate(PROFILE_SCREENS.MY_ACCOUNT)}
    />
  );
};

export { SectionsScreen };
