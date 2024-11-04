import React from 'react';

import useWhoCheckedCredit from './hooks';

import { WhoCheckedCreditModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const WhoCheckedCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.WhoCheckCredit>> = () => {
  const { data, report } = useWhoCheckedCredit();

  return <WhoCheckedCreditModule data={data} onRefresh={report.refetch} reportLoading={report.loading} />;
};

export { WhoCheckedCredit };
