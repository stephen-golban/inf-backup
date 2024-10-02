import React from 'react';

import { Screen } from '@components/common';
import { PaymentCards } from '@components/ui';
import { usePaymentCardsService } from '@services/payment-cards';

const PaymentsCards: React.FC = () => {
  const props = usePaymentCardsService();

  return (
    <Screen fill maxh="35%" unsafe onRefresh={props.cards.refetch} loading={props.cards.loading}>
      <PaymentCards {...props} />
    </Screen>
  );
};

export default PaymentsCards;
