import React, { useEffect } from 'react';

import { useLazyAxios } from '@api/hooks';
import { useLogoutService } from '@services/logout';
import { useGoBack, useImagePicker } from '@library/hooks';

import { SectionsModule } from '@modules/logged-in';

import { RegisterApiResponse } from '@typings/responses';
import { PROFILE_SCREENS, SETTINGS_SCREENS, type ProfileStackScreenProps } from '@typings/navigation/';
import { logScreenView } from '../../../../../../firebaseEvents';

const SectionsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SECTIONS>> = ({ navigation }) => {
  const logout = useLogoutService();
  useGoBack(true, navigation.goBack);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      logScreenView('SectionsScreen');
    });

    return unsubscribe;
  }, [navigation]);

  const { base64Image, selectImage } = useImagePicker();

  const [call, { loading }] = useLazyAxios<RegisterApiResponse>({
    url: '/admin-api/persons',
    method: 'post',
  });

  useEffect(() => {
    if (base64Image) {
      call({ photo: base64Image });
    }
  }, [base64Image, call]);

  return (
    <SectionsModule
      onLogout={logout}
      onEdit={selectImage}
      loadingAvatar={loading}
      onOpenFaq={() => navigation.navigate(PROFILE_SCREENS.FAQ)}
      onOpenContacts={() => navigation.navigate(PROFILE_SCREENS.CONTACTS)}
      onOpenMyAccount={() => navigation.navigate(PROFILE_SCREENS.MY_ACCOUNT)}
      onInviteFriends={() => navigation.navigate(PROFILE_SCREENS.INVITE_FRIENDS)}
      onOpenMyNotitications={() => navigation.navigate(PROFILE_SCREENS.NOTIFICATIONS)}
      onOpenSettings={() => navigation.navigate(PROFILE_SCREENS.SETTINGS, { screen: SETTINGS_SCREENS.SECTIONS })}
    />
  );
};

export { SectionsScreen };
