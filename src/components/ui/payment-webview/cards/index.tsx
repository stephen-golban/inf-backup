import React from 'react';
import { useAxios } from '@api/hooks';
import { GetAllCardsApiResponse } from '@typings/responses';
import { BaseButton, FilledButton, Icon, Screen, Text, View } from '@components/common';
import { ListView } from '@components/ui/list-view';

interface IFunnelCards {
  selected: string | null;
  onPressContinue(): void;
  onSelect(val: string): void;
}

const FunnelCards: React.FC<IFunnelCards> = ({ onSelect, onPressContinue, selected }) => {
  const { data, loading } = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });

  return (
    <Screen unsafe loading={loading}>
      <ListView
        data={data}
        keyExtractor={(item, idx) => item.id + idx.toString()}
        renderItem={({ item }) => {
          const isSelected = item.billerId === selected;
          return (
            <BaseButton
              bw={1}
              p="lg"
              w={279}
              h={144}
              between
              br={24}
              bg="softGray"
              shadow="credit_card"
              onPress={() => onSelect(item.billerId)}
              bc={isSelected ? 'gray' : 'transparent'}>
              <View>
                <Text variant="12-reg" t18n="profile:settings:payment_history_screen:my_card" />
                <Text variant="14-semi" text={item.cardNr} mt="xs" />
              </View>
              <View row between align="center">
                <Text variant="14-reg" text={item.cardType} />
                <Icon icon="MasterCardIcon" size={30} />
              </View>
            </BaseButton>
          );
        }}
      />
      <FilledButton onPress={onPressContinue} t18n="ui:continue" />
    </Screen>
  );
};

export default FunnelCards;
