import React from 'react';

import FaqScreen from './faq';
import { SectionsScreen } from './sections';
import { ContactsScreen } from './contacts';
import { MyAccountScreen } from './my-account';
import ChangePassword from './change-password';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LOGGED_IN_SCREENS, type LoggedInScreensProps, PROFILE_SCREENS, type ProfileStackParams } from '@typings/navigation';
import InviteFriends from './invite-friends';
import { InviteFriendsFormScreen } from './invite-friends-form';

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PROFILE_SCREENS.SECTIONS} component={SectionsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.CONTACTS} component={ContactsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.MY_ACCOUNT} component={MyAccountScreen} />
      <Stack.Screen name={PROFILE_SCREENS.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={PROFILE_SCREENS.INVITE_FRIENDS} component={InviteFriends} />
      <Stack.Screen name={PROFILE_SCREENS.INVITE_FRIENDS_FORM} component={InviteFriendsFormScreen} />
      <Stack.Screen name={PROFILE_SCREENS.FAQ} component={FaqScreen} />
    </Stack.Navigator>
  );
};

export { ProfileStack };
