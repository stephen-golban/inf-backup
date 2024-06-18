import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { execFunc } from '@library/method';

import { FlashList } from '@shopify/flash-list';

import type { ListViewProps } from './type';

export const ListView = (props: ListViewProps) => {
  const { type = 'flashlist', onRefresh, onLoadMore, canRefresh = false, canLoadMore = false, refreshing = false } = props;

  function loadMore() {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  }

  const ListComponent = type === 'flashlist' ? FlashList : FlatList;

  return (
    <ListComponent
      refreshControl={canRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined}
      onEndReached={loadMore}
      onEndReachedThreshold={0.001}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
};
