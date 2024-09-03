import React from 'react';

import { useLazyAxios } from '@api/hooks';

import { CreditReportSummaryModule } from '@modules/logged-in';

import { LOGGED_IN_SCREENS, OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps, PAYMENT_SCREENS } from '@typings/navigation';

const CreditReportSummaryScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.CreditReportSummary>> = ({
  route,
  navigation,
}) => {
  const report = route.params?.data;

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback/credit-report`,
  });

  function onOrderReport() {
    navigation.navigate(LOGGED_IN_SCREENS.PAYMENT, {
      screen: PAYMENT_SCREENS.CARDS,
      params: { paymentType: 'ONE_CLICK', purchasedServiceName: 'CREDIT_REPORT' },
    });
  }

  return <CreditReportSummaryModule onSubmit={data => call({ ...data })} data={report} loading={loading} onOrderReport={onOrderReport} />;
};

export { CreditReportSummaryScreen };
