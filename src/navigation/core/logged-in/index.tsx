import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SCREENS from '@screens/logged-in';
import { APP_SCREEN, LOGGED_IN_TABS, LoggedInTabsParamList, type RootStackScreenProps } from '@typings/navigators';

const Tab = createBottomTabNavigator<LoggedInTabsParamList>();

const AuthorizedStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_IN>> = () => {
  return (
    <Tab.Navigator initialRouteName={LOGGED_IN_TABS.HOME}>
      <Tab.Screen name={LOGGED_IN_TABS.HOME} component={SCREENS.Home} />
    </Tab.Navigator>
  );
};

export default AuthorizedStack;
