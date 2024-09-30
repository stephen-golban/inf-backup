import React from 'react';

import { usePaymentCardsService } from '@services/payment-cards';

import { PaymentCards } from '@components/ui';
import { FilledButton, Screen, Switch, Text, View } from '@components/common';

import type { GetAllCardsApiResponse, SelectedCardParams } from '@typings/responses';

interface IPaymentCardsModule {
  paymentLoading?: boolean;
  hasAutomaticTermExtension?: boolean;
  onPressContinue(args: SelectedCardParams): void;
}

const PaymentCardsModule: React.FC<IPaymentCardsModule> = ({ onPressContinue, paymentLoading, hasAutomaticTermExtension = false }) => {
  const service = usePaymentCardsService();

  const [currentCard, setCurrentCard] = React.useState<GetAllCardsApiResponse[number]>();
  const [automaticTermExtension, setAutomaticTermExtension] = React.useState<boolean>(true);

  return (
    <Screen removeInsets loading={service.cards.loading} onRefresh={service.cards.refetch} scroll px="sm" pb="xl" style={{ flex: 1 }}>
      <View fill>
        <View fill rg="md" maxh={300}>
          <PaymentCards {...service} setCurrentCard={setCurrentCard} />
          {hasAutomaticTermExtension && (
            <View row align="center" mt="lg">
              <Text variant="16-bold" t18n="logged_in:payment:automatic_term_extension" />
              <Switch checked={automaticTermExtension} onCheckedChange={setAutomaticTermExtension} ml="sm" sizeW={38} sizeH={20} />
            </View>
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
