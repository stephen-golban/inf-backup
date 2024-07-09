import React from 'react';

import useWhoCheckedCredit from './hooks';

import { WhoCheckedCreditModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, type OwnDataCheckScreenProps } from '@typings/navigation';

const WhoCheckedCredit: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.WhoCheckCredit>> = () => {
  const { data, loading, refetch } = useWhoCheckedCredit();

  return <WhoCheckedCreditModule data={data} loading={loading} onRefresh={refetch} />;
};

export { WhoCheckedCredit };
