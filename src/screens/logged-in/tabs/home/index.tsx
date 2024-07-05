import React from 'react';

import { HomeModule } from '@modules/logged-in';
import { ActivityIndicator, View } from '@components/common';

import { LOGGED_IN_TABS, type LoggedInTabsScreenProps } from '@typings/navigation';
import useHomeScreen from './hooks';

const Home: React.FC<LoggedInTabsScreenProps<LOGGED_IN_TABS.HOME>> = ({}) => {
  const { data, loading } = useHomeScreen();

  if (loading) {
    return (
      <View fill justify="center">
        <ActivityIndicator />
      </View>
    );
  }

  return <HomeModule />;
};

export { Home };
