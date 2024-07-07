import React from 'react';

import { SectionsScreen } from './sections';
import { MyAccountScreen } from './my-account';
import ChangePassword from './change-password';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGGED_IN_SCREENS, LoggedInScreensProps } from '@typings/navigation/core/logged-in/screens';
import { PROFILE_SCREENS, ProfileStackParams } from '@typings/navigation/core/logged-in/screens/profile';

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.PROFILE>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={PROFILE_SCREENS.SECTIONS} component={SectionsScreen} />
      <Stack.Screen name={PROFILE_SCREENS.MY_ACCOUNT} component={MyAccountScreen} />
      <Stack.Screen name={PROFILE_SCREENS.CHANGE_PASSWORD} component={ChangePassword} />
    </Stack.Navigator>
  );
};

export { ProfileStack };
