import React from 'react';

import { Loader } from '@components/ui';
import { Icon, IconType, Text, View } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

interface ICard {
  isFirst: boolean;
  loadingDelete: boolean;
  item: GetAllCardsApiResponse[number];
  onDeleteCard: (id: number) => Promise<void>;
}

const Card: React.FC<ICard> = ({ isFirst, loadingDelete, item, onDeleteCard }) => {
  const isLoading = loadingDelete && isFirst;

  const isVisa = item.cardNr.startsWith('4');
  const isMasterCard = item.cardNr.startsWith('2') || item.cardNr.startsWith('5');
  const CardIcon: IconType = isVisa ? 'VisaCardIcon' : isMasterCard ? 'MasterCardIcon' : 'CreditCardIcon';

  return (
    <View bg="softGray" br={24} p="lg" w={279} h={144} between shadow="credit_card">
      {isFirst && <Icon icon="TrashIcon" color="error" absolute top={15} right={10} size={20} onPress={() => onDeleteCard(item.id)} />}
      {isLoading && <Loader bg="lightBlue" opacity={0.5} br={24} />}
      <View>
        <Text variant="12-reg" t18n="profile:settings:payment_history_screen:my_card" />
        <Text variant="14-semi" text={item.cardNr} mt="xs" />
      </View>
      <View row between align="center">
        <Text variant="14-reg" text={item.cardType} />
        <Icon icon={CardIcon} size={30} />
      </View>
    </View>
  );
};

export default Card;
