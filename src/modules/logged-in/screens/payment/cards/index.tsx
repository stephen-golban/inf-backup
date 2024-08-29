import React from 'react';

import { useMount, useUpdateEffect } from 'react-use';
import { useAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import CardList from './Card.List';
import { FilledButton, Screen, Text, View } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

interface IPaymentCardsModule {
  onPressContinue(billerId: string): void;
}

const PaymentCardsModule: React.FC<IPaymentCardsModule> = ({ onPressContinue }) => {
  const { data, loading, refetch } = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });

  const [billerId, setBillerId] = React.useState<string>('');

  const onRefresh = useTryCatch(async () => {
    await refetch();
  });

  useUpdateEffect(() => {
    if (data) {
      setBillerId(data[0].billerId);
    }
  }, [data]);

  return (
    <Screen unsafe loading={loading} onRefresh={onRefresh} fill py="xl" px="md">
      <View fill>
        <CardList onSelect={setBillerId} selected={billerId} data={data} />
        <Text variant="16-bold" t18n="logged_in:payment:new_card" />
      </View>
      <FilledButton onPress={() => onPressContinue(billerId)} t18n="ui:continue" />
    </Screen>
  );
};

export { PaymentCardsModule };
