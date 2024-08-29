import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PaymentCardsScreen } from './cards';
import { PaymentOrderScreen } from './order';

import { LOGGED_IN_SCREENS, type LoggedInScreensProps, PAYMENT_SCREENS, type PaymentStackParamList } from '@typings/navigation';

const Stack = createNativeStackNavigator<PaymentStackParamList>();

const PaymentStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.PAYMENT>> = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen component={PaymentCardsScreen} name={PAYMENT_SCREENS.CARDS} />
    <Stack.Screen component={PaymentOrderScreen} name={PAYMENT_SCREENS.ORDER} />
  </Stack.Navigator>
);

export { PaymentStack };
