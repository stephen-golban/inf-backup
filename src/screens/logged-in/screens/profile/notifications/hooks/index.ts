import { useLazyAxios } from '@api/hooks';

import { useState, useCallback } from 'react';

import { INotificationsResponse } from '@typings/responses';
import { useToast } from 'react-native-toast-notifications';

export const useNotifications = () => {
  const toast = useToast();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [internalLoading, setInternalLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const SIZE = 30;

  const constructUrl = useCallback(() => {
    return `/notifications?page=${page}&size=${SIZE}&channelType=push-notification`;
  }, [page, SIZE]);

  const [call, { loading }] = useLazyAxios<INotificationsResponse | null>(constructUrl());

  const loadNotifications = useCallback(async () => {
    if (internalLoading || loading || !hasMore) return;

    setInternalLoading(true);

    try {
      const response = await call();

      const newNotifications: any = response?.notifications || [];
      const pageDetails = response?.pageDetails;

      if (newNotifications.length < SIZE || pageDetails?.totalPages === page + 1) {
        setHasMore(false);
      }

      setNotifications(prev => [...prev, ...newNotifications]);
      setPage(prev => prev + 1);
    } catch (error) {
      toast.show('Failed to load notifications', { type: 'danger' });
    } finally {
      setInternalLoading(false);
    }
  }, [call, internalLoading, loading, hasMore, SIZE, page]);

  return { notifications, loadMore: loadNotifications, loading: internalLoading || loading, hasMore };
};
