import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as S from '@screens/logged-out';
import { Screen } from '@components/common';

import { APP_SCREEN, LOGGED_OUT_SCREENS, LoggedOutStackParamList, RootStackScreenProps } from '@typings/navigation';

const Stack = createNativeStackNavigator<LoggedOutStackParamList>();

const LoggedOutStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_OUT>> = () => {
  return (
    <Screen bg="primary">
      <Stack.Navigator initialRouteName={LOGGED_OUT_SCREENS.Welcome} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={LOGGED_OUT_SCREENS.Welcome} component={S.Welcome} />
      </Stack.Navigator>
    </Screen>
  );
};

export default LoggedOutStack;
