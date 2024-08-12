import React from 'react';

import { isEmpty } from 'lodash';
import { useAxios, useLazyAxios } from '@api/hooks';

import { Loader } from '@components/ui';
import { Icon, Text, View, CardStack, Screen } from '@components/common';

import type { GetAllCardsApiResponse } from '@typings/responses';

const HistoryCards: React.FC = () => {
  const stackRef = React.useRef<any>(null);
  const [call, { loading }] = useLazyAxios('/bank-card-accounts', { method: 'delete' });
  const { data, ...cards } = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });

  async function onDeleteCard(id: number) {
    await call(
      undefined,
      async () => {
        stackRef.current?.swipe(-1);
        await cards.refetch();
      },
      { additionalUrl: `/${id}` },
    );
  }

  const _renderItem = React.useCallback(
    (item: GetAllCardsApiResponse[number], isFirst: boolean) => {
      const isLoading = loading && isFirst;
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
            <Icon icon="MasterCardIcon" size={30} />
          </View>
        </View>
      );
    },
    [loading, data],
  );

  return (
    <Screen fill maxh="30%" unsafe onRefresh={cards.refetch} loading={cards.loading}>
      {isEmpty(data) ? (
        <View center my="md">
          <Text t18n="profile:settings:payment_history_screen:no_cards_to_display" />
        </View>
      ) : (
        <CardStack ref={stackRef} data={data!} renderItem={_renderItem} />
      )}
    </Screen>
  );
};

export default HistoryCards;
