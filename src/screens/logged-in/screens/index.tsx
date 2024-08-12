import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileStack } from './profile';
import { FeedbackStack } from './feedback';
import { OwnDataCheckStack } from './own-data-check';

import { LOGGED_IN_STACK, LoggedInStackProps } from '@typings/navigation';
import { LOGGED_IN_SCREENS, LoggedInScreensParams } from '@typings/navigation/core/logged-in/screens';

const Stack = createNativeStackNavigator<LoggedInScreensParams>();

const Screens: React.FC<LoggedInStackProps<LOGGED_IN_STACK.SCREENS>> = () => {
  return (
    <Stack.Navigator initialRouteName={LOGGED_IN_SCREENS.PROFILE} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LOGGED_IN_SCREENS.PROFILE} component={ProfileStack} />
      <Stack.Screen name={LOGGED_IN_SCREENS.FEEDBACK} component={FeedbackStack} />
      <Stack.Screen name={LOGGED_IN_SCREENS.OWN_DATA_CHECK} component={OwnDataCheckStack} />
    </Stack.Navigator>
  );
};

export { Screens };
