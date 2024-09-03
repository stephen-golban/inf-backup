import React from 'react';

import { useGoBack } from '@library/hooks';
import usePaymentOrderScreen from './hooks';
import { useExecutePaymentService } from '@services/execute-payment';

import { PaymentOrderModule } from '@modules/logged-in';

import { PAYMENT_SCREENS, type PaymentStackScreenProps } from '@typings/navigation';
import type { CreditReportOrderFormFields } from '@modules/logged-in/screens/payment/order/resolver';

const PaymentOrderScreen: React.FC<PaymentStackScreenProps<PAYMENT_SCREENS.ORDER>> = ({ navigation, route }) => {
  const { billerId, ...params } = route.params;
  const { onSuccess, createReportLoading } = usePaymentOrderScreen();

  const { loading, onPressPay } = useExecutePaymentService({ billerId });

  const onSubmit = (data: CreditReportOrderFormFields) => onPressPay(params, params => onSuccess(params, data));

  useGoBack(true, navigation.goBack);

  return <PaymentOrderModule onSubmit={onSubmit} loading={loading || createReportLoading} />;
};

export { PaymentOrderScreen };
