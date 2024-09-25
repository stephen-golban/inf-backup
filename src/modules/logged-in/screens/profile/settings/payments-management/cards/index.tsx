import React from 'react';

import { isEmpty } from 'lodash';
import useCardsManagement from './hooks';

import Card from './card';
import { Text, View, CardStack, Screen, OutlinedButton } from '@components/common';

const PaymentsCards: React.FC = () => {
  const { stackRef, callbackLoading, cards, loadingRegister, loadingDelete, onDeleteCard, onRegisterCard } = useCardsManagement();

  const data = cards.data;

  return (
    <Screen fill maxh="35%" unsafe onRefresh={cards.refetch} loading={cards.loading}>
      {!data || isEmpty(data) ? (
        <View center my="md">
          <Text t18n="profile:settings:payment_history_screen:no_cards_to_display" />
        </View>
      ) : (
        <CardStack
          ref={stackRef}
          data={data!}
          renderItem={(item, isFirst) => (
            <Card
              item={item as any}
              canDelete={data.length > 1}
              isFirst={isFirst}
              loadingDelete={loadingDelete}
              onDeleteCard={onDeleteCard}
            />
          )}
        />
      )}
      <View px="md">
        <OutlinedButton
          loading={loadingRegister || callbackLoading}
          onPress={() => onRegisterCard(cards.refetch)}
          t18n="profile:settings:payment_history_screen:register_new_card"
        />
      </View>
    </Screen>
  );
};

export default PaymentsCards;
