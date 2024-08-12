import React from 'react';

import { useTheme } from '@theme/index';

import HistoryList from './history-list';
import HistoryCards from './history-cards';
import { Screen } from '@components/common';

const PaymentHistoryModule: React.FC = () => {
  const { spacing } = useTheme();

  return (
    <Screen unsafe style={{ paddingTop: spacing.md, paddingHorizontal: 0 }}>
      <HistoryCards />

      <HistoryList />
    </Screen>
  );
};

export { PaymentHistoryModule };
