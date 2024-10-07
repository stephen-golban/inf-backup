import React from 'react';

import { useGoBack } from '@library/hooks';
import { useCreateCreditReportService } from '@services/use-create-credit-report';

import { PaymentOrderModule } from '@modules/logged-in';

import { type PaymentStackScreenProps, LOGGED_IN_STACK, LOGGED_IN_TABS, PAYMENT_SCREENS } from '@typings/navigation';
import type { CreditReportOrderFormFields } from '@modules/logged-in/screens/payment/order/resolver';

const PaymentOrderScreen: React.FC<PaymentStackScreenProps<PAYMENT_SCREENS.ORDER>> = ({ navigation, route }) => {
  const reportId = route.params?.reportId || 0;
  const { createPDF, loading } = useCreateCreditReportService();

  const onSubmit = (data: CreditReportOrderFormFields) => {};

  const onPressDownload = () => createPDF(reportId);
  const onPressSend = (email: string) => createPDF(reportId, { email });
  const onPressNotNow = () => navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });

  useGoBack(true, navigation.goBack);

  return (
    <PaymentOrderModule
      loading={loading}
      onSubmit={onSubmit}
      onPressSend={onPressSend}
      onPressNotNow={onPressNotNow}
      onPressDownload={onPressDownload}
    />
  );
};

export { PaymentOrderScreen };
