import React from 'react';

import { isEmpty } from 'lodash';
import useCardsManagement from './hooks';

import Card from './card';
import { Text, View, CardStack, Screen, OutlinedButton } from '@components/common';

const PaymentsCards: React.FC = () => {
  const { stackRef, callbackLoading, cards, loadingRegister, loadingDelete, onDeleteCard, onRegisterCard } = useCardsManagement();

  return (
    <Screen fill maxh="40%" unsafe onRefresh={cards.refetch} loading={cards.loading}>
      {isEmpty(cards.data) ? (
        <View center my="md">
          <Text t18n="profile:settings:payment_history_screen:no_cards_to_display" />
        </View>
      ) : (
        <CardStack
          ref={stackRef}
          data={cards.data!}
          renderItem={(item, isFirst) => (
            <Card item={item as any} isFirst={isFirst} loadingDelete={loadingDelete} onDeleteCard={onDeleteCard} />
          )}
        />
      )}
      <View px="md">
        <OutlinedButton
          onPress={onRegisterCard}
          loading={loadingRegister || callbackLoading}
          t18n="profile:settings:payment_history_screen:register_new_card"
        />
      </View>
    </Screen>
  );
};

export default PaymentsCards;
