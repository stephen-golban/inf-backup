import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StayScreen } from './stay';
import { ReasonScreen } from './reason';
import { TellUsMore } from './tell-more';

import { LOGGED_IN_SCREENS, type LoggedInScreensProps } from '@typings/navigation';
import { FEEDBACK_SCREENS, FeedbackStackParams } from '@typings/navigation/core/logged-in/screens/feedback';
import { RemoveScreen } from './remove';

const Stack = createNativeStackNavigator<FeedbackStackParams>();

const FeedbackStack: React.FC<LoggedInScreensProps<LOGGED_IN_SCREENS.FEEDBACK>> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={FEEDBACK_SCREENS.REASON} component={ReasonScreen} />
      <Stack.Screen name={FEEDBACK_SCREENS.STAY} component={StayScreen} />
      <Stack.Screen name={FEEDBACK_SCREENS.REMOVE} component={RemoveScreen} />
      <Stack.Screen name={FEEDBACK_SCREENS.TELL_US_MORE} component={TellUsMore} />
    </Stack.Navigator>
  );
};

export { FeedbackStack };
