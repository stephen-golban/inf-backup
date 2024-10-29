import React, { useEffect, useState } from 'react';
import { EmptyList } from './parts';
import { FlatList } from 'react-native';
import { Loader } from '@components/ui';
import { Icon, IconType, Text, View } from '@components/common';

import { Notification } from '@typings/responses';
import { useTranslation } from '@library/hooks';

interface INotificationModule {
  hasMore: boolean;
  loading: boolean;
  onLoadMore(): void;
  notifications: Notification[];
}

const NotificationModule: React.FC<INotificationModule> = props => {
  const { notifications, hasMore, loading, onLoadMore } = props;
  const [initialLoading, setInitialLoading] = useState(true);

  const { t } = useTranslation();

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
        return { message: t('ui:notifications:own_data_check'), icon: 'FindPersonIcon' };
      case 'CREDIT_REPORT_EVENT':
        return { message: t('ui:notifications:credit_report_event'), icon: 'SettingsRefreshIcon' };
      case 'USER_INACTIVITY':
        return { message: t('ui:notifications:user_inactivity'), icon: 'EyeBlueIcon' };
      case 'SUBSCRITION_EXPIRING_INFO':
        return { message: t('ui:notifications:subscription_expiring_info'), icon: 'TimePersonIcon' };
      case 'NEW_BASIC_SERVICE':
        return { message: t('ui:notifications:new_basic_service'), icon: 'YellowPlusIcon' };
      case 'INQUIRY':
        return { message: t('ui:notifications:database_query'), icon: 'SettingsRefreshIcon' };
      default:
        return { message: t('ui:notifications:unknown_notification'), icon: 'SettingsRefreshIcon' };
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
        renderItem={({ item }) => {
          const IconComponent = getMessage(item?.notificationType)?.icon || Icon;

          return (
            <View bg="lightGray" px="md" py="md" m="sm" br={24} shadow="card">
              <View row maxw="80%" align="center">
                <Icon mr="sm" icon={IconComponent as IconType} size={40} />
                <Text>{getMessage(item.notificationType)?.message}</Text>
              </View>
            </View>
          );
        }}
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
