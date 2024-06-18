import React from 'react';

import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Header } from '@components/ui';

import * as SCREENS from '@screens/logged-in';

import { APP_SCREEN, LOGGED_IN_TABS, LoggedInTabsParamList, type RootStackScreenProps } from '@typings/navigation';

const Tab = createBottomTabNavigator<LoggedInTabsParamList>();

const renderHeader = (props: BottomTabHeaderProps) => <Header {...props} />;

const LoggedInStack: React.FC<RootStackScreenProps<APP_SCREEN.LOGGED_IN>> = () => {
  return (
    <Tab.Navigator initialRouteName={LOGGED_IN_TABS.HOME} screenOptions={{ header: renderHeader }}>
      <Tab.Screen name={LOGGED_IN_TABS.HOME} component={SCREENS.Home} />
    </Tab.Navigator>
  );
};

export default LoggedInStack;
