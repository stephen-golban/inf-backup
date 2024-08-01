import React from 'react';

import { useGoBack } from '@library/hooks';

import { HomeModule } from '@modules/logged-in';

import { LOGGED_IN_TABS, LOGGED_IN_STACK, LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, type LoggedInTabsProps } from '@typings/navigation';

const Home: React.FC<LoggedInTabsProps<LOGGED_IN_TABS.HOME>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);

  const navigate = (screen: OWN_DATA_CHECK_SCREENS, params?: any) => {
    navigation.navigate(LOGGED_IN_STACK.SCREENS, { screen: LOGGED_IN_SCREENS.OWN_DATA_CHECK, params: { screen, ...params } });
  };

  return (
    <HomeModule
      onPressCreditScore={data => navigate(OWN_DATA_CHECK_SCREENS.ScoringDetails, { params: { data } })}
      onPressCreditReport={data => navigate(OWN_DATA_CHECK_SCREENS.CreditReportSummary, { params: { data } })}
      infoBox={{
        onPressNewCredit: () => navigate(OWN_DATA_CHECK_SCREENS.NewCredit),
        onPressCreditReport: () => navigate(OWN_DATA_CHECK_SCREENS.CreditReportSummary),
        onPressWhoCheckedCredit: () => navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit),
      }}
    />
  );
};

export { Home };
