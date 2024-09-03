import React, { useEffect, useState } from 'react';
import { EmptyList } from './parts';
import { FlatList } from 'react-native';
import { Loader } from '@components/ui';
import { Text, View } from '@components/common';

import { Notification } from '@typings/responses';

interface INotificationModule {
  hasMore: boolean;
  loading: boolean;
  onLoadMore(): void;
  notifications: Notification[];
}

const NotificationModule: React.FC<INotificationModule> = props => {
  const { notifications, hasMore, loading, onLoadMore } = props;
  const [initialLoading, setInitialLoading] = useState(true);

  const handleInitialLoad = () => {
    if (initialLoading) {
      onLoadMore();
    }
  };

  const handleLoadingChange = () => {
    if (!loading) {
      setInitialLoading(false);
    }
  };

  useEffect(handleInitialLoad, [initialLoading, onLoadMore]);
  useEffect(handleLoadingChange, [loading]);

  const getMessage = (notificationType: string) => {
    switch (notificationType) {
      case 'OWN_DATA_CHECK':
        return 'Cineva ti-a verificat istoria de credit recent';
      case 'CREDIT_REPORT_EVENT':
        return 'Am inregistrat modificari majore in istoria ta creditara';
      case 'USER_INACTIVITY':
        return 'Salut! Observat inactivitate de lunga durata pe cont';
      case 'SUBSCRITION_EXPIRING_INFO':
        return 'Abonamentul expira in 15 zile';
      case 'NEW_BASIC_SERVICE':
        return 'Serviciu NOU';
      default:
        return 'Notificare necunoscută';
    }
  };

  if (initialLoading && notifications.length === 0) {
    return <Loader center />;
  }

  return (
    <View fill p="md" mb="md">
      <FlatList
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        ListEmptyComponent={() => (!loading && notifications.length === 0 ? <EmptyList /> : null)}
        data={notifications}
        keyExtractor={(item: Notification, index) => `${item.notificationAddress}_${index}`}
        renderItem={({ item }) => (
          <View bg="lightGray" px="md" py="md" m="sm" br={24} shadow="card">
            <Text>{getMessage(item.notificationType)}</Text>
          </View>
        )}
        ListFooterComponent={() => (loading ? <Loader center p="md" /> : null)}
        onEndReached={() => {
          if (hasMore && !loading) {
            onLoadMore();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export { NotificationModule };
