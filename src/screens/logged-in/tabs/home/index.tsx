import React from 'react';

import useHomeScreen from './hooks';
import { useGoBack } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import { TrialModal } from '@modules/modals';
import { HomeModule } from '@modules/logged-in';

import {
  LOGGED_IN_TABS,
  LOGGED_IN_STACK,
  LOGGED_IN_SCREENS,
  SUBSCRIPTIONS_SCREENS,
  OWN_DATA_CHECK_SCREENS,
  type LoggedInTabsProps,
} from '@typings/navigation';

const Home: React.FC<LoggedInTabsProps<LOGGED_IN_TABS.HOME>> = ({ navigation }) => {
  const report = useAppDataCheckStore(state => state.creditReportSummary);
  const reportId = useAppDataCheckStore(state => state.inquiry?.basicServices.creditReportSummaryId);
  const { loading, onRefresh, isTrialModalVisible, setIsTrialModalVisible, trialTermDate } = useHomeScreen();

  useGoBack(false, navigation.goBack);

  const navigate = (screen: OWN_DATA_CHECK_SCREENS, params?: any) => {
    navigation.navigate(LOGGED_IN_STACK.SCREENS, { screen: LOGGED_IN_SCREENS.OWN_DATA_CHECK, params: { screen, ...params } });
  };

  const onPressNewCredit = () => navigate(OWN_DATA_CHECK_SCREENS.NewCredit);
  const onPressCreditScore = () => navigate(OWN_DATA_CHECK_SCREENS.ScoringDetails);
  const onPressWhoCheckedCredit = () => navigate(OWN_DATA_CHECK_SCREENS.WhoCheckCredit);
  const onPressCreditSummary = () => navigate(OWN_DATA_CHECK_SCREENS.CreditReportSummary);
  const onPressCreditReport = () => {
    if (reportId && report) {
      navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
        params: {
          id: reportId,
          generationDateTime: report.responseDateTime,
        },
      });
    }
  };
  const goToSubscriptions = () => {
    setIsTrialModalVisible(false);
    navigation.navigate(LOGGED_IN_STACK.SCREENS, {
      screen: LOGGED_IN_SCREENS.SUBSCRIPTIONS,
      params: { screen: SUBSCRIPTIONS_SCREENS.INDEX },
    });
  };

  return (
    <>
      <HomeModule
        loading={loading}
        onRefresh={onRefresh}
        onPressNewCredit={onPressNewCredit}
        onPressCreditScore={onPressCreditScore}
        onPressCreditReport={onPressCreditReport}
        onPressCreditSummary={onPressCreditSummary}
        onPressWhoCheckedCredit={onPressWhoCheckedCredit}
      />
      <TrialModal
        date={trialTermDate}
        isVisible={isTrialModalVisible}
        onPressButton={goToSubscriptions}
        onDismiss={() => setIsTrialModalVisible(false)}
      />
    </>
  );
};

export { Home };
