import React from 'react';

import { useTheme } from '@theme/index';
import usePaymentHistory from './hooks';

import HistoryList from './history-list';
import HistoryCards from './history-cards';
import { Screen } from '@components/common';

const PaymentHistoryModule: React.FC = () => {
  const { spacing } = useTheme();
  const { cards, history, refetch, loading } = usePaymentHistory();

  return (
    <Screen scroll unsafe style={{ paddingTop: spacing.md, paddingHorizontal: 0 }} loading={loading} onRefresh={refetch}>
      {cards && <HistoryCards data={cards} />}

      {history && <HistoryList data={history} />}
    </Screen>
  );
};

export { PaymentHistoryModule };
