import React from 'react';
import { isEmpty } from 'lodash';
import { useAxios } from '@api/hooks';
import { useUpdateEffect } from 'react-use';
import { useTryCatch } from '@library/hooks';
import { useRegisterCardService } from '@services/register-card';

import CardList from './Card.List';
import { FilledButton, Icon, OutlinedButton, Screen, Switch, Text, View } from '@components/common';

import type { GetAllCardsApiResponse, SelectedCardParams } from '@typings/responses';

interface IPaymentCardsModule {
  paymentLoading?: boolean;
  hasAutomaticTermExtension?: boolean;
  onPressContinue(args: SelectedCardParams): void;
}

const PaymentCardsModule: React.FC<IPaymentCardsModule> = ({ onPressContinue, paymentLoading, hasAutomaticTermExtension = false }) => {
  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();
  const { data, loading, refetch } = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });

  const [billerId, setBillerId] = React.useState<string>('');
  const [automaticTermExtension, setAutomaticTermExtension] = React.useState<boolean>(true);

  useUpdateEffect(() => {
    if (data && !isEmpty(data)) {
      setBillerId(data[0].billerId);
    }
  }, [data]);

  const cardAddingLoading = loadingRegister || callbackLoading;

  return (
    <Screen loading={loading} onRefresh={refetch} fill px="lg" pb="xl">
      <View fill rg="md">
        {hasAutomaticTermExtension && (
          <View row align="center">
            <Text variant="16-bold" t18n="logged_in:payment:automatic_term_extension" />
            <Switch checked={automaticTermExtension} onCheckedChange={setAutomaticTermExtension} ml="sm" sizeW={38} sizeH={20} />
          </View>
        )}
        {!isEmpty(data) && <CardList onSelect={setBillerId} selected={billerId} data={data} />}
        <OutlinedButton row align="center" onPress={() => onRegisterCard(refetch)} loading={cardAddingLoading}>
          <Text variant="16-bold" t18n="logged_in:payment:new_card" />
          <Icon icon="PlusIcon" color="blue" size={20} ml="sm" />
        </OutlinedButton>
      </View>
      {data && !isEmpty(data) && (
        <FilledButton
          t18n="ui:continue"
          loading={paymentLoading}
          onPress={() => onPressContinue({ billerId, cardId: data[0].id, automaticTermExtension })}
        />
      )}
    </Screen>
  );
};

export { PaymentCardsModule };
