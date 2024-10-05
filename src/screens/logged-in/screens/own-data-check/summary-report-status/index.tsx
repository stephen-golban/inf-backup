import React from 'react';
import { SummaryReportStatusModule } from '@modules/logged-in';
import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const SummaryReportStatusScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.SummaryReportStatus>> = ({
  navigation,
  route,
}) => {
  const transactionStatus = 'accepted';
  return <SummaryReportStatusModule status={transactionStatus} onPress={() => navigation.goBack()} />;
};

export { SummaryReportStatusScreen };
