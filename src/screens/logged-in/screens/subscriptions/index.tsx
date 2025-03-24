import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StayScreen } from './stay';
import { ReasonScreen } from './reason';
import { RemoveScreen } from './remove';
import { TellUsMore } from './tell-more';
import { SubscriptionsScreen } from './subscriptions/index';

import { LOGGED_IN_SCREENS, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackParams, type LoggedInScreensProps } from '@typings/navigation';

const Stack = createNativeStackNavigator<SubscriptionsStackParams>();

const SubscriptionsStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.SUBSCRIPTIONS>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SUBSCRIPTIONS_SCREENS.INDEX}>
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.INDEX} component={SubscriptionsScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.REASON} component={ReasonScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.STAY} component={StayScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.REMOVE} component={RemoveScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.TELL_US_MORE} component={TellUsMore} />
    </Stack.Navigator>
  );
};

export { SubscriptionsStack };
