import React from 'react';

import { HomeModule } from '@modules/logged-in';

import { LOGGED_IN_TABS, type LoggedInTabsScreenProps } from '@typings/navigators';

const Home: React.FC<LoggedInTabsScreenProps<LOGGED_IN_TABS.HOME>> = ({}) => {
  return <HomeModule />;
};

export { Home };
