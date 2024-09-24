import React from 'react';

import useWhoCheckedCredit from './hooks';

import { NewCreditModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const NewCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.NewCredit>> = () => {
  const { data, fetchReport, report, updateLoading } = useWhoCheckedCredit();

  return (
    <NewCreditModule
      data={data}
      updateReport={fetchReport}
      onRefresh={report.refetch}
      updateLoading={updateLoading}
      inquiryLoading={report.loading}
    />
  );
};

export { NewCredit };
