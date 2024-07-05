import React from 'react';

import { HomeModule } from '@modules/logged-in';

import { Button } from 'react-native';
import { useLogoutService } from '@services/logout';

import { LOGGED_IN_TABS, type LoggedInTabsProps } from '@typings/navigation';

const Home: React.FC<LoggedInTabsProps<LOGGED_IN_TABS.HOME>> = ({}) => {
  const logout = useLogoutService();

  return (
    <>
      <Button title="logout" onPress={logout} />
      <HomeModule />
    </>
  );
};

export { Home };
