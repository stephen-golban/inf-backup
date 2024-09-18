import React from 'react';

import { noop } from 'lodash';
import { useGoBack } from '@library/hooks';
import { useLogoutService } from '@services/logout';

import { SectionsModule } from '@modules/logged-in';

import {
  LOGGED_IN_SCREENS,
  PROFILE_SCREENS,
  SETTINGS_SCREENS,
  SUBSCRIPTIONS_SCREENS,
  type ProfileStackScreenProps,
} from '@typings/navigation';

const SectionsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SECTIONS>> = ({ navigation }) => {
  const logout = useLogoutService();
  useGoBack(true, navigation.goBack);

  return (
    <SectionsModule
      onOpenFaq={() => navigation.navigate(PROFILE_SCREENS.FAQ)}
      onEdit={noop}
      onLogout={logout}
      onOpenContacts={() => navigation.navigate(PROFILE_SCREENS.CONTACTS)}
      onOpenSettings={() => navigation.navigate(PROFILE_SCREENS.SETTINGS, { screen: SETTINGS_SCREENS.SECTIONS })}
      onInviteFriends={() => navigation.navigate(PROFILE_SCREENS.INVITE_FRIENDS)}
      onOpenMyNotitications={noop}
      onOpenMyAccount={() => navigation.navigate(PROFILE_SCREENS.MY_ACCOUNT)}
      onOpenMySubscriptions={() => navigation.navigate(LOGGED_IN_SCREENS.SUBSCRIPTIONS, { screen: SUBSCRIPTIONS_SCREENS.INDEX })} // Add this line
    />
  );
};

export { SectionsScreen };
