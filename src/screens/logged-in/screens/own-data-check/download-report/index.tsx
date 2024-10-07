import React from 'react';

import { DownloadReportModule } from '@modules/logged-in';

import { LOGGED_IN_STACK, LOGGED_IN_TABS, OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const DownloadReport: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.DownloadReport>> = ({ navigation, route }) => {
  const reportId = route.params.id;
  const generationDateTime = route.params.generationDateTime;

  const onPressNotNow = () => navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });

  return <DownloadReportModule reportId={reportId} onPressNotNow={onPressNotNow} generationDateTime={generationDateTime} />;
};

export { DownloadReport };
