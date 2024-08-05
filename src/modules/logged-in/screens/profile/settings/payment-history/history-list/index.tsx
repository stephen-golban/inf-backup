import React from 'react';

import ListItem from './List.Item';
import ListHeader from './List.Header';
import { Text } from '@components/common';
import { ListView, Paper } from '@components/ui';

import type { AllPaymentsApiResponse } from '@typings/responses';

interface IHistoryList {
  data: AllPaymentsApiResponse;
}

const HistoryList: React.FC<IHistoryList> = ({ data }) => {
  return (
    <Paper bg="lightBlue" p="xl" br={8} mt={20} fill btlr="xl" btrr="xl">
      <ListView
        type="flatlist"
        scrollEnabled={false}
        ListHeaderComponent={ListHeader}
        data={data?.paymentDetailsResponseList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListItem {...item} />}
        ListEmptyComponent={<Text t18n="profile:settings:payment_history_screen:no_payment_history" />}
      />
    </Paper>
  );
};

export default HistoryList;
