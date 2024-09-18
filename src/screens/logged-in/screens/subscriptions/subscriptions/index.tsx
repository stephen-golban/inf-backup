import React from 'react';

import { useAxios } from '@api/hooks';
import { useGetSubscription } from '@services/subscription';

import { SubscriptionsModule } from '@modules/logged-in';

import type { IAllSubscriptionsResponse } from '@typings/responses';
import { type SubscriptionsStackScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

const SubscriptionsScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.INDEX>> = ({ navigation }) => {
  const purschased = useGetSubscription(false);
  const all = useAxios<IAllSubscriptionsResponse>('/admin-api/subscriptions', { method: 'get' });

  const loading = purschased.loading || all.loading;

  const onRefresh = async () => {
    await Promise.all([purschased.getSubscription(), all.refetch()]);
  };

  const onCancelSubscription = () => navigation.navigate(SUBSCRIPTIONS_SCREENS.CANCEL_STAY);

  return (
    <SubscriptionsModule
      all={all.data}
      loading={loading}
      onRefresh={onRefresh}
      purschased={purschased.subscription}
      onCancelSubscription={onCancelSubscription}
    />
  );
};

export { SubscriptionsScreen };
