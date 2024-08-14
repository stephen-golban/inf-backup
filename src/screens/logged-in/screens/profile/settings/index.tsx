import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Sections } from './sections';

import { PROFILE_SCREENS, SETTINGS_SCREENS, SettingsStackParams, type ProfileStackScreenProps } from '@typings/navigation';
import { PaymentHistory } from './payment-history';

const Stack = createNativeStackNavigator<SettingsStackParams>();

const SettingsStack: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SETTINGS>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SETTINGS_SCREENS.SECTIONS} component={Sections} />
      <Stack.Screen name={SETTINGS_SCREENS.PAYMENTS_HISTORY} component={PaymentHistory} />
    </Stack.Navigator>
  );
};

export { SettingsStack };
