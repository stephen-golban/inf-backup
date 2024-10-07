import React from 'react';

import { isEmpty } from 'lodash';
import usePaymentCards from './hooks';

import Card from './card';
import { CardStack, OutlinedButton, Text, View } from '@components/common';

import type { BaseAxiosProps } from '@api/hooks/type';
import type { GetAllCardsApiResponse } from '@typings/responses';

interface IPaymentCards {
  cards: BaseAxiosProps<GetAllCardsApiResponse>;
  setCurrentCard?(val: GetAllCardsApiResponse[number]): void;
}

const PaymentCards: React.FC<IPaymentCards> = ({ cards, setCurrentCard }) => {
  const { callbackLoading, loadingDelete, loadingRegister, onDeleteCard, onRegisterCard, stackRef } = usePaymentCards(cards);

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
