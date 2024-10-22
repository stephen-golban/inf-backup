import React from 'react';

import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useLogoutService } from '@services/logout';

import { RemoveModule } from '@modules/logged-in';

import { SUBSCRIPTIONS_SCREENS, type SubscriptionsStackScreenProps } from '@typings/navigation';

const RemoveScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.REMOVE>> = ({ navigation, route }) => {
  const logout = useLogoutService();
  const subscription = useAppStore(state => state.subscription);

  const [remove, { loading }] = useLazyAxios('/admin-api/account', { method: 'delete' });

  const onRemove = useTryCatch(async () => await remove(undefined, logout));

  const isAvailableSubscription =
    subscription && !subscription.trial && new Date(subscription.subscriptionAccounts[0].termDateTime) > new Date();

  return <RemoveModule onRemove={onRemove} loading={loading} isAvailableSubscription={isAvailableSubscription} />;
};

export { RemoveScreen };
