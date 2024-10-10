import React from 'react';

import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import { CreditReportSummaryModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({ navigation }) => {
  const report = useAppDataCheckStore(state => state.creditReportSummary);
  const reportId = useAppDataCheckStore(state => state.inquiry?.basicServices.creditReportSummaryId);

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback/credit-report`,
  });

  function onOrderReport() {
    if (reportId) {
      navigation.navigate(OWN_DATA_CHECK_SCREENS.DownloadReport, {
        id: reportId,
        generationDateTime: report?.responseDateTime as any,
      });
    }
  }

  return (
    <CreditReportSummaryModule onSubmit={data => call({ ...data })} data={report} feedbackLoading={loading} onOrderReport={onOrderReport} />
  );
};

export { CreditReportSummaryScreen };
