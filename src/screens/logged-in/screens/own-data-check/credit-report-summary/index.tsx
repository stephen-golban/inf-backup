import React from 'react';

import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import { CreditReportSummaryModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({ navigation }) => {
  const report = useAppDataCheckStore(state => state.creditReportSummary);

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback/credit-report`,
  });

  function onOrderReport() {
    navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, { id: report?.reportId || 0 });
  }

  return (
    <CreditReportSummaryModule onSubmit={data => call({ ...data })} data={report} feedbackLoading={loading} onOrderReport={onOrderReport} />
  );
};

export { CreditReportSummaryScreen };
