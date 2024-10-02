import React from 'react';

import { isEmpty } from 'lodash';
import { usePaymentCardsService } from '@services/payment-cards';

import Card from './card';
import { CardStack, OutlinedButton, Text, View } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

interface IPaymentCards extends ReturnType<typeof usePaymentCardsService> {
  setCurrentCard?(val: GetAllCardsApiResponse[number]): void;
}

const PaymentCards: React.FC<IPaymentCards> = ({
  cards,
  stackRef,
  loadingDelete,
  loadingRegister,
  callbackLoading,
  setCurrentCard,
  onDeleteCard,
  onRegisterCard,
}) => {
  const data = cards.data;

  return (
    <>
      {!data || isEmpty(data) ? (
        <View center my="md">
          <Text t18n="profile:settings:payment_history_screen:no_cards_to_display" />
        </View>
      ) : (
        <CardStack
          ref={stackRef}
          data={data!}
          renderItem={(item, isFirst) => {
            if (isFirst) {
              setCurrentCard?.(item as any);
            }
            return <Card item={item as any} isFirst={isFirst} loadingDelete={loadingDelete} onDeleteCard={onDeleteCard} />;
          }}
        />
      )}
      <OutlinedButton
        loading={loadingRegister || callbackLoading}
        onPress={() => onRegisterCard(cards.refetch)}
        t18n="profile:settings:payment_history_screen:register_new_card"
      />
    </>
  );
};

export { PaymentCards };
