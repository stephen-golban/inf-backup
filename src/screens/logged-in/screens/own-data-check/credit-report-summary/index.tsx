import React from 'react';

import { useLazyAxios } from '@api/hooks';

import { noop } from 'lodash';

import { CreditReportSummaryModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({ route }) => {
  const report = route.params?.data;

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback/credit-report`,
  });

  return <CreditReportSummaryModule onSubmit={data => call({ ...data })} data={report} loading={loading} onOrderReport={noop} />;
};

export { CreditReportSummaryScreen };
