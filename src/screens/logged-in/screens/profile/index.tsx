import React from 'react';

import FaqScreen from './faq';
import { SettingsStack } from './settings';
import { SectionsScreen } from './sections';
import { ContactsScreen } from './contacts';
import InviteFriends from './invite-friends';
import { MyAccountScreen } from './my-account';
import ChangePassword from './change-password';
import NotificationsScreen from './notifications';
import { InviteFriendsFormScreen } from './invite-friends-form';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LOGGED_IN_SCREENS, type LoggedInScreensProps, PROFILE_SCREENS, type ProfileStackParams } from '@typings/navigation';

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PROFILE_SCREENS.SECTIONS} component={SectionsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.FAQ} component={FaqScreen} />
      <Stack.Screen name={PROFILE_SCREENS.SETTINGS} component={SettingsStack} />
      <Stack.Screen name={PROFILE_SCREENS.CONTACTS} component={ContactsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.MY_ACCOUNT} component={MyAccountScreen} />
      <Stack.Screen name={PROFILE_SCREENS.INVITE_FRIENDS} component={InviteFriends} />
      <Stack.Screen name={PROFILE_SCREENS.CHANGE_PASSWORD} component={ChangePassword} />
      <Stack.Screen name={PROFILE_SCREENS.NOTIFICATIONS} component={NotificationsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.INVITE_FRIENDS_FORM} component={InviteFriendsFormScreen} />
    </Stack.Navigator>
  );
};

export { ProfileStack };
