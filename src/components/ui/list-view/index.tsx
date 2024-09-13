import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { execFunc } from '@library/method';

import { FlashList } from '@shopify/flash-list';

import type { ListViewProps } from './type';
import { EmptyState } from '../empty-state';

export const ListView = <T,>(props: ListViewProps<T>) => {
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
      ListEmptyComponent={EmptyState}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
      onRefresh={undefined}
      refreshing={undefined}
    />
  );
};
