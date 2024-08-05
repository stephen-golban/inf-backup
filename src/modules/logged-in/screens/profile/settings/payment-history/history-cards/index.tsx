import React from 'react';

import { ListView } from '@components/ui';
import { Icon, Text, View } from '@components/common';
import { isEmpty } from 'lodash';

interface IHistoryCards {
  data: any[];
}

const HistoryCards: React.FC<IHistoryCards> = ({ data }) => {
  console.log(data);

  if (isEmpty(data)) {
    return (
      <View center my="md">
        <Text t18n="profile:settings:payment_history_screen:no_cards_to_display" />
      </View>
    );
  }

  return (
    <ListView
      type="flatlist"
      horizontal
      data={data}
      keyExtractor={(_, idx) => 'card-item' + idx}
      renderItem={({ item }) => {
        return (
          <View bg="softGray" br={24} p="lg" w={279} h={144} between>
            <View>
              <Text variant="12-reg" t18n="profile:settings:payment_history_screen:my_card" />
              <Text variant="14-semi" t18n="profile:settings:payment_history_screen:card_number" mt="xs" />
            </View>
            <View row between align="center">
              <Text variant="14-reg" t18n="profile:settings:payment_history_screen:cardholder_name" />
              <Icon icon="MasterCardIcon" size={30} />
            </View>
          </View>
        );
      }}
    />
    // <View px="xxl" w="100%" mt="lg">
    //   <View bg="softGray" br={24} p="lg" h={144} w="100%" between>
    //     <View>
    //       <Text variant="12-reg" t18n="profile:settings:payment_history_screen:my_card" />
    //       <Text variant="14-semi" t18n="profile:settings:payment_history_screen:card_number" mt="xs" />
    //     </View>
    //     <View row between align="center">
    //       <Text variant="14-reg" t18n="profile:settings:payment_history_screen:cardholder_name" />
    //       <Icon icon="MasterCardIcon" size={30} />
    //     </View>
    //   </View>
    // </View>
  );
};

export default HistoryCards;
