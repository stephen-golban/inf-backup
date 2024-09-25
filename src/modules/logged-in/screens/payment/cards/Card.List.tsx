import React from 'react';

import { useTheme } from '@theme/index';

import { ListView } from '@components/ui';
import { Checkbox, Icon, IconType, Text, View } from '@components/common';

import type { BaseAxiosProps } from '@api/hooks/type';
import type { GetAllCardsApiResponse } from '@typings/responses';

interface ICardList extends Pick<BaseAxiosProps<GetAllCardsApiResponse>, 'data'> {
  selected: string;
  onSelect(val: string): void;
}

const CardList: React.FC<ICardList> = ({ data, onSelect, selected }) => {
  const { spacing } = useTheme();
  return (
    <View>
      <Text variant="16-bold" t18n="logged_in:payment:my_saved_cards" />
      {/* <Accordion */}
      <ListView
        type="flatlist"
        data={data}
        scrollEnabled={false}
        contentContainerStyle={{ marginLeft: spacing.sm }}
        keyExtractor={(item, idx) => item.id + idx.toString()}
        renderItem={({ item }) => {
          const isSelected = item.billerId === selected;
          const isVisa = item.cardNr.startsWith('4');
          const isMasterCard = item.cardNr.startsWith('2') || item.cardNr.startsWith('5');
          const CardIcon: IconType = isVisa ? 'VisaCardIcon' : isMasterCard ? 'MasterCardIcon' : 'CreditCardIcon';

          return (
            <Checkbox value={isSelected} size={16} checkIconSize={10} onToggle={() => onSelect(item.billerId)}>
              <View row align="center" between py="xs" fill ml="sm">
                <Text variant="14-semi" readLinks={false} mt="xs" text={item.cardNr} />
                <Icon icon={CardIcon} size={25} color={!isVisa && !isMasterCard ? 'blue' : undefined} />
              </View>
            </Checkbox>
          );
        }}
      />
    </View>
  );
};

export default CardList;
