import React from 'react';

import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from './home';

import { AppBar } from '@components/ui';
import { LOGGED_IN_TABS, LoggedInTabsParams } from '@typings/navigation/core/logged-in/tabs';
import { LOGGED_IN_STACK, LoggedInStackProps } from '@typings/navigation';

const Tab = createBottomTabNavigator<LoggedInTabsParams>();

const renderTabbar = (props: BottomTabBarProps) => <AppBar {...props} />;

const Tabs: React.FC<LoggedInStackProps<LOGGED_IN_STACK.TABS>> = () => {
  return (
    <Tab.Navigator initialRouteName={LOGGED_IN_TABS.HOME} tabBar={renderTabbar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={LOGGED_IN_TABS.HOME} component={Home} />
    </Tab.Navigator>
  );
};

export { Tabs };
