import React from 'react';

import { useGoBack } from '@library/hooks';
import { useLazyAxios } from '@api/hooks';

import { PaymentOrderModule } from '@modules/logged-in';

import { PAYMENT_SCREENS, type PaymentStackScreenProps } from '@typings/navigation';

const PaymentOrderScreen: React.FC<PaymentStackScreenProps<PAYMENT_SCREENS.ORDER>> = ({ navigation }) => {
  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/order/credit-report`,
  });

  useGoBack(true, navigation.goBack);

  return <PaymentOrderModule onSubmit={data => call({ ...data })} loading={loading} />;
};

export { PaymentOrderScreen };
