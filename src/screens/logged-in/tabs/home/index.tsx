import React from 'react';

import { noop } from 'lodash';
import { useGoBack } from '@library/hooks';

import { HomeModule } from '@modules/logged-in';

import type { ICreditReportSummaryResponse, ICreditScoreResponse } from '@typings/responses';

import { LOGGED_IN_TABS, LOGGED_IN_STACK, LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, type LoggedInTabsProps } from '@typings/navigation';

const Home: React.FC<LoggedInTabsProps<LOGGED_IN_TABS.HOME>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);

  const navigate = (screen: OWN_DATA_CHECK_SCREENS) => {
    navigation.navigate(LOGGED_IN_STACK.SCREENS, { screen: LOGGED_IN_SCREENS.OWN_DATA_CHECK, params: { screen } });
  };

  function onPressCreditScore(data: ICreditScoreResponse) {
    return noop;
  }
  function onPressCreditReport(data: ICreditReportSummaryResponse) {
    return noop;
  }

  return (
    <HomeModule
      onPressCreditReport={onPressCreditReport}
      onPressCreditScore={onPressCreditScore}
      infoBox={{
        onPressNewCredit: () => navigate(OWN_DATA_CHECK_SCREENS.NewCredit),
        onPressCreditReport: () => navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit),
        onPressWhoCheckedCredit: () => navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit),
      }}
    />
  );
};

export { Home };
