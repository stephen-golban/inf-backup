import React from 'react';

import { useLazyAxios } from '@api/hooks';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';
import { CreditReportOrderModule } from '@modules/logged-in';
import { useGoBack } from '@library/hooks';

const CreditReportOrderScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportOrder>> = ({ navigation }) => {
  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/order/credit-report`,
  });

  useGoBack(true, navigation.goBack);

  return <CreditReportOrderModule onSubmit={data => call({ ...data })} loading={loading} />;
};

export { CreditReportOrderScreen };
