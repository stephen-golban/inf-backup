import React from 'react';

import { useMount, useUpdateEffect } from 'react-use';
import { useAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import CardList from './Card.List';
import { BaseButton, FilledButton, Icon, OutlinedButton, Screen, Text, View } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';
import { useRegisterCardService } from '@services/register-card';

interface IPaymentCardsModule {
  onPressContinue(billerId: string): void;
}

const PaymentCardsModule: React.FC<IPaymentCardsModule> = ({ onPressContinue }) => {
  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();
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

  const cardAddingLoading = loadingRegister || callbackLoading;

  return (
    <Screen unsafe loading={loading} onRefresh={onRefresh} style={{ flex: 1 }} scroll>
      <View fill rg="md">
        <CardList onSelect={setBillerId} selected={billerId} data={data} />
        <OutlinedButton row align="center" onPress={() => onRegisterCard(refetch)} loading={cardAddingLoading}>
          <Text variant="16-bold" t18n="logged_in:payment:new_card" />
          <Icon icon="PlusIcon" color="blue" size={20} ml="sm" />
        </OutlinedButton>
      </View>
      <FilledButton onPress={() => onPressContinue(billerId)} t18n="ui:continue" />
    </Screen>
  );
};

export { PaymentCardsModule };
