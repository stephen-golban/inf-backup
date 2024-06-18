import React from 'react';

import { useAppStore } from '@store/app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoggedInStack from './logged-in';
import LoggedOutStack from './logged-out';

import { APP_SCREEN, type RootStackParamList } from '@typings/navigators';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const token = useAppStore(state => state.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
      {token ? (
        <Stack.Group>
          <Stack.Screen name={APP_SCREEN.LOGGED_IN} component={LoggedInStack} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ freezeOnBlur: true }}>
          <Stack.Screen name={APP_SCREEN.LOGGED_OUT} component={LoggedOutStack} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
