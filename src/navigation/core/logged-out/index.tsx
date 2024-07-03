import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as S from '@screens/logged-out';
import { Screen } from '@components/common';
import { LoggedOutHeader } from '@components/ui';

import { APP_SCREEN, LOGGED_OUT_SCREENS, LoggedOutStackParamList, RootStackScreenProps } from '@typings/navigation';

const Stack = createNativeStackNavigator<LoggedOutStackParamList>();

const LoggedOutStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_OUT>> = () => {
  return (
    <Screen bg="primary" excludeEdges={['bottom']}>
      <Stack.Navigator initialRouteName={LOGGED_OUT_SCREENS.Welcome} screenOptions={{ header: props => <LoggedOutHeader {...props} /> }}>
        <Stack.Screen name={LOGGED_OUT_SCREENS.Login} component={S.Login} />
        <Stack.Screen name={LOGGED_OUT_SCREENS.Welcome} component={S.Welcome} />
        <Stack.Screen name={LOGGED_OUT_SCREENS.Register} component={S.Register} />
        <Stack.Screen name={LOGGED_OUT_SCREENS.ForgotPassword} component={S.ForgotPassword} />
        <Stack.Screen name={LOGGED_OUT_SCREENS.CreatePassword} component={S.PasswordCreate} />
        <Stack.Screen name={LOGGED_OUT_SCREENS.ExpiredRegister} component={S.ExpiredRegister} />
        <Stack.Screen
          name={LOGGED_OUT_SCREENS.OneTimePassword}
          component={S.OneTimePassword}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack.Navigator>
    </Screen>
  );
};

export default LoggedOutStack;
