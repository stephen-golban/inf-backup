import React from 'react';

import { useAppStore } from '@store/app';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoggedInStack from './logged-in';
import LoggedOutStack from './logged-out';
import { PinScreen } from '@screens/pin-screen';

import { APP_SCREEN, type RootStackParamList } from '@typings/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const CoreNavigator = () => {
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen name={APP_SCREEN.PIN_SCREEN} component={PinScreen} />
          <Stack.Screen name={APP_SCREEN.LOGGED_IN} component={LoggedInStack} />
        </Stack.Group>
      ) : (
        <Stack.Screen name={APP_SCREEN.LOGGED_OUT} component={LoggedOutStack} />
      )}
    </Stack.Navigator>
  );
};

export default CoreNavigator;
