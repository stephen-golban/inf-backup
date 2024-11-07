import React from 'react';

import { isEmpty } from 'lodash';

import ListItem from './List.Item';
import ListHeader from './List.Header';
import { EmptyState, ListView, Paper } from '@components/ui';

import type { AllPaymentsApiResponse } from '@typings/responses';

interface IHistoryList {
  data: AllPaymentsApiResponse | undefined;
}

const HistoryList: React.FC<IHistoryList> = ({ data }) => {
  const isEmptyData = isEmpty(data?.payments);
  return (
    <Paper bg="lightBlue" p="xl" br={8} mt={20} fill btlr="xl" btrr="xl">
      <ListView
        type="flatlist"
        data={data?.payments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListItem {...item} />}
        ListHeaderComponent={isEmptyData ? null : ListHeader}
        ListEmptyComponent={<EmptyState t18n="profile:settings:payment_history_screen:no_payment_history" />}
      />
    </Paper>
  );
};

export default HistoryList;
