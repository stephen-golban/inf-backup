import React from 'react';
import { useNotifications } from './hooks';

import { NotificationModule } from '@modules/logged-in';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const NotificationsScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.NOTIFICATIONS>> = ({ navigation }) => {
  const { notifications, loadMore, loading, hasMore } = useNotifications();

  return <NotificationModule hasMore={hasMore} loading={loading} notifications={notifications as any} onLoadMore={loadMore} />;
};

export default NotificationsScreen;
