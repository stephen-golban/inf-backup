import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CancelStayScreen } from './cancel-stay';
import { SubscriptionsScreen } from './subscriptions';
import { CancelFeedbackScreen } from './cancel-feedback';

import { PROFILE_SCREENS, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackParams, type ProfileStackScreenProps } from '@typings/navigation';

const Stack = createNativeStackNavigator<SubscriptionsStackParams>();

const SubscriptionsStack: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.SUBSCRIPTIONS>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.INDEX} component={SubscriptionsScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.CANCEL_FEEDBACK} component={CancelFeedbackScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.CANCEL_STAY} component={CancelStayScreen} />
    </Stack.Navigator>
  );
};

export { SubscriptionsStack };
