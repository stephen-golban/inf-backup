import React from 'react';

import { useTranslation } from '@library/hooks';

import { Loader } from '@components/ui';
import { Icon, Text, View, Alert, IconType } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

interface ICard {
  isFirst: boolean;
  loadingDelete: boolean;
  onPressDelete: () => void;
  item: GetAllCardsApiResponse[number];
}

const Card: React.FC<ICard> = ({ isFirst, item, onPressDelete, loadingDelete }) => {
  const { t } = useTranslation();
  const isVisa = item.cardNr.startsWith('4');
  const isMasterCard = item.cardNr.startsWith('2') || item.cardNr.startsWith('5');
  const CardIcon: IconType = isVisa ? 'VisaCardIcon' : isMasterCard ? 'MasterCardIcon' : 'CreditCardIcon';

  const isLoading = loadingDelete && isFirst;

  return (
    <View bg="softGray" br={24} p="lg" w={279} h={144} between shadow="credit_card">
      {isLoading && <Loader bg="lightBlue" opacity={0.5} br={24} />}

      {isFirst && (
        <Alert title={t('ui:delete_card:title')} description={t('ui:delete_card:description')} onContinue={onPressDelete}>
          <Icon icon="TrashIcon" color="error" size={20} absolute top={15} right={10} />
        </Alert>
      )}
      <View>
        <Text variant="12-reg" t18n="profile:settings:payment_history_screen:my_card" />
        <Text variant="14-semi" mt="xs">
          {item.cardNr}
          <View absoluteFill />
        </Text>
      </View>
      <View row between align="center">
        <Text variant="14-reg" text={item.cardType} />
        <Icon icon={CardIcon} size={30} />
      </View>
    </View>
  );
};

export { Card };
