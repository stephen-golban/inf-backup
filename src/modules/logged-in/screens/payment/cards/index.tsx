import React from 'react';
import { isEmpty } from 'lodash';
import { useAxios } from '@api/hooks';
import { useUpdateEffect } from 'react-use';
import { useTryCatch } from '@library/hooks';
import { useRegisterCardService } from '@services/register-card';

import CardList from './Card.List';
import { FilledButton, Icon, OutlinedButton, Screen, Text, View } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

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
    if (data && !isEmpty(data)) {
      setBillerId(data[0].billerId);
    }
  }, [data]);

  const cardAddingLoading = loadingRegister || callbackLoading;

  return (
    <Screen unsafe loading={loading} onRefresh={onRefresh} style={{ flex: 1 }} p="lg" pb="xl">
      <View fill rg="md">
        {!isEmpty(data) && <CardList onSelect={setBillerId} selected={billerId} data={data} />}
        <OutlinedButton row align="center" onPress={() => onRegisterCard(refetch)} loading={cardAddingLoading}>
          <Text variant="16-bold" t18n="logged_in:payment:new_card" />
          <Icon icon="PlusIcon" color="blue" size={20} ml="sm" />
        </OutlinedButton>
      </View>
      {!isEmpty(data) && <FilledButton onPress={() => onPressContinue(billerId)} t18n="ui:continue" />}
    </Screen>
  );
};

export { PaymentCardsModule };
