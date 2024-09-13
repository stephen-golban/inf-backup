import React from 'react';

import { useAxios } from '@api/hooks';

import ListItem from './List.Item';
import ListHeader from './List.Header';
import { Text } from '@components/common';
import { ListView, Paper } from '@components/ui';

import type { AllPaymentsApiResponse } from '@typings/responses';

const HistoryList = () => {
  const { data, loading, refetch } = useAxios<AllPaymentsApiResponse>('/payment-purchases', { method: 'get' });

  return (
    <Paper bg="lightBlue" p="xl" br={8} mt={20} fill btlr="xl" btrr="xl">
      <ListView
        type="flatlist"
        canRefresh
        onRefresh={refetch}
        refreshing={loading}
        ListHeaderComponent={ListHeader}
        data={data?.payments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ListItem {...item} />}
        ListEmptyComponent={<Text t18n="profile:settings:payment_history_screen:no_payment_history" />}
      />
    </Paper>
  );
};

export default HistoryList;
