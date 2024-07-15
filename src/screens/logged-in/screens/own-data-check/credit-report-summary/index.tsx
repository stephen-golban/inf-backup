import React from 'react';

import { noop } from 'lodash';

import { CreditReportSummaryModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({ route }) => {
  const report = route.params?.data;
  return <CreditReportSummaryModule onSubmit={noop} data={report} onOrderReport={noop} />;
};

export { CreditReportSummaryScreen };
