import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Sections } from './sections';
import { PaymentsManagement } from './payments-management';
import { TechnicalFeedback } from './technical-feedback';

import { PROFILE_SCREENS, SETTINGS_SCREENS, SettingsStackParams, type ProfileStackScreenProps } from '@typings/navigation';
import { useGoBack } from '@library/hooks';

const Stack = createNativeStackNavigator<SettingsStackParams>();

const SettingsStack: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SETTINGS>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SETTINGS_SCREENS.SECTIONS} component={Sections} />
      <Stack.Screen name={SETTINGS_SCREENS.TECHNICAL_FEEDBACK} component={TechnicalFeedback} />
      <Stack.Screen name={SETTINGS_SCREENS.PAYMENTS_MANAGEMENT} component={PaymentsManagement} />
    </Stack.Navigator>
  );
};

export { SettingsStack };
