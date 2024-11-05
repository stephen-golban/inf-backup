import React from 'react';

import { isEmpty } from 'lodash';
import { useAxios } from '@api/hooks';
import { useTheme } from '@theme/index';
import { useCreditCardService } from '@services/credit-card';

import HistoryList from './history-list';
import { Screen, View } from '@components/common';
import { CreditCards, EmptyState } from '@components/ui';

import type { AllPaymentsApiResponse, GetAllCardsApiResponse } from '@typings/responses';

const PaymentsManagementModule: React.FC = () => {
  const { spacing } = useTheme();
  const history = useAxios<AllPaymentsApiResponse>('/payment-purchases', { method: 'get' });
  const { cards, stackRef, isRegistering, loadingDelete, functions } = useCreditCardService();

  const _renderItem = React.useCallback(
    (item: GetAllCardsApiResponse[number], isFirst: boolean) => {
      return (
        <CreditCards.Card
          item={item}
          isFirst={isFirst}
          loadingDelete={loadingDelete}
          onPressDelete={() => functions.onDeleteCard(item.id)}
        />
      );
    },
    [functions.onDeleteCard, loadingDelete],
  );

  const onRefresh = () => {
    cards.refetch();
    history.refetch();
  };

  const loading = cards.loading || history.loading;

  return (
    <Screen
      unsafe
      scroll
      loading={loading}
      onRefresh={onRefresh}
      excludeEdges={['bottom']}
      style={{ paddingTop: spacing.md, paddingBottom: 0, paddingHorizontal: 0, flex: 1 }}>
      {cards.data && isEmpty(cards.data) ? (
        <EmptyState t18n="profile:settings:payment_history_screen:no_cards_to_display" />
      ) : (
        <View px="lg" minh={300}>
          {cards.data && <CreditCards.Stack ref={stackRef} data={cards.data} renderItem={_renderItem} />}
        </View>
      )}
      <View px="lg" mt="md">
        <CreditCards.Register onPress={functions.onPressRegisterCard} loading={isRegistering} />
      </View>

      <HistoryList data={history.data} />
    </Screen>
  );
};

export { PaymentsManagementModule };
