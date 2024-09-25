import { useState } from 'react';
import { useTryCatch } from '@library/hooks';
import { useAxios } from '@api/hooks';
import { useGetSubscription } from '@services/subscription';

import type { IAllSubscriptionsResponse } from '@typings/responses';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';

export default function useSubscriptionsScreen() {
  const subscriptionService = useGetSubscription(false);

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

  const allSubscriptions = useAxios<IAllSubscriptionsResponse>('/admin-api/subscriptions', { method: 'get' });

  const screenLoading = subscriptionService.loading || allSubscriptions.loading;

  const onDismiss = () => setSelectedPlan(undefined);

  const onRefresh = useTryCatch(async () => {
    await Promise.all([await subscriptionService.getSubscription(), await allSubscriptions.refetch()]);
  });

  const onSuccess = () => {
    onRefresh();
    onDismiss();
  };

  return {
    selectedPlan,
    screenLoading,
    allSubscriptions,
    subscriptionService,
    onSuccess,
    onDismiss,
    onRefresh,
    setSelectedPlan,
  };
}
