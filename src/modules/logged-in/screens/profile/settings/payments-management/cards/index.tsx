import React from 'react';

import { useAxios } from '@api/hooks';

import { Screen } from '@components/common';
import { PaymentCards } from '@components/ui';

import type { GetAllCardsApiResponse } from '@typings/responses';

const PaymentsCards: React.FC = () => {
  const cards = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });

  return (
    <Screen fill maxh="35%" unsafe onRefresh={cards.refetch} loading={cards.loading}>
      <PaymentCards cards={cards} />
    </Screen>
  );
};

export default PaymentsCards;
