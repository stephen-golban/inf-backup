import React from 'react';

import { isEmpty } from 'lodash';
import { useCreditCardService } from '@services/credit-card';

import { CreditCards, EmptyState } from '@components/ui';
import { FilledButton, Screen, View } from '@components/common';

import type { GetAllCardsApiResponse, SelectedCardParams } from '@typings/responses';

interface IPaymentCardsModule {
  paymentLoading?: boolean;
  hasAutomaticTermExtension?: boolean;
  onPressContinue(args: SelectedCardParams): void;
}

const PaymentCardsModule: React.FC<IPaymentCardsModule> = ({ onPressContinue, paymentLoading, hasAutomaticTermExtension = false }) => {
  const { cards, stackRef, currentCard, automaticTermExtension, isRegistering, loadingDelete, functions } = useCreditCardService();
  const { setCurrentCard, onDeleteCard, onPressRegisterCard, setAutomaticTermExtension } = functions;

  const _renderItem = React.useCallback(
    (item: GetAllCardsApiResponse[number], isFirst: boolean) => {
      return <CreditCards.Card item={item} isFirst={isFirst} loadingDelete={loadingDelete} onPressDelete={() => onDeleteCard(item.id)} />;
    },
    [onDeleteCard, loadingDelete],
  );

  return (
    <Screen removeInsets loading={cards.loading} onRefresh={cards.refetch} scroll px="sm" pb="xl" style={{ flex: 1 }}>
      <View fill>
        <View fill rg="md" maxh={300}>
          {!cards.data || isEmpty(cards.data) ? (
            <EmptyState t18n="profile:settings:payment_history_screen:no_cards_to_display" />
          ) : (
            <>
              <CreditCards.Stack ref={stackRef} setCurrentCard={setCurrentCard} data={cards.data} renderItem={_renderItem} />
              <CreditCards.Register onPress={onPressRegisterCard} loading={isRegistering} />
              {hasAutomaticTermExtension && (
                <CreditCards.TermExtension toggled={automaticTermExtension} onChange={setAutomaticTermExtension} />
              )}
            </>
          )}
        </View>
      </View>

      {currentCard && (
        <FilledButton
          t18n="ui:continue"
          loading={paymentLoading}
          onPress={() => onPressContinue({ billerId: currentCard.billerId, cardId: currentCard.id, automaticTermExtension })}
        />
      )}
    </Screen>
  );
};

export { PaymentCardsModule };
