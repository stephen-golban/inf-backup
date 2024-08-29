import React from 'react';

import { useTheme } from '@theme/index';

import PaymentsCards from './cards';
import HistoryList from './history-list';
import { Screen } from '@components/common';

const PaymentsManagementModule: React.FC = () => {
  const { spacing } = useTheme();

  return (
    <Screen unsafe style={{ paddingTop: spacing.md, paddingHorizontal: 0 }}>
      <PaymentsCards />

      <HistoryList />
    </Screen>
  );
};

export { PaymentsManagementModule };
