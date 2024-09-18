import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CancelStayScreen } from './cancel-stay';
import { TrialExtendScreen } from './trial-extend';
import { SubscriptionsScreen } from './subscriptions';
import { CancelFeedbackScreen } from './cancel-feedback';

import { LOGGED_IN_SCREENS, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackParams, type LoggedInScreensProps } from '@typings/navigation';

const Stack = createNativeStackNavigator<SubscriptionsStackParams>();

const SubscriptionsStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.SUBSCRIPTIONS>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={SUBSCRIPTIONS_SCREENS.INDEX}>
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.INDEX} component={SubscriptionsScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.CANCEL_FEEDBACK} component={CancelFeedbackScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.TRIAL_EXTEND} component={TrialExtendScreen} />
      <Stack.Screen name={SUBSCRIPTIONS_SCREENS.CANCEL_STAY} component={CancelStayScreen} />
    </Stack.Navigator>
  );
};

export { SubscriptionsStack };
