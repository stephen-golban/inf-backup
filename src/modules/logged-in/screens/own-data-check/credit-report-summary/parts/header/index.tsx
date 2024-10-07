import React from 'react';

import { useTranslation } from '@library/hooks';

import { Text, View } from '@components/common';

import { currencyFormat } from '@library/method';

interface IHeader {
  totalBalance: number;
}

const Header: React.FC<IHeader> = ({ totalBalance }) => {
  const { t } = useTranslation();
  return (
    <View bg="blue" br="xl" p="lg">
      <Text color="white" variant="18-bold" textAlign="center">
        {t('logged_in:credit_report:summary:total_of_active_commitments')}
      </Text>
      <Text color="white" variant="18-bold" textAlign="center">
        {currencyFormat(totalBalance)}
      </Text>
    </View>
  );
};

export { Header };
