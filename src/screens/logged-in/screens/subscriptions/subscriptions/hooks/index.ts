import { useState } from 'react';
import { useAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useGetSubscription } from '@services/subscription';
import { useLastInquiryService } from '@services/last-inquiry';

import type { IAllSubscriptionsResponse } from '@typings/responses';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';

export default function useSubscriptionsScreen() {
  const subscriptionService = useGetSubscription(false);
  const { fetchInquiryReport, loadingInquiry } = useLastInquiryService();

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

  const allSubscriptions = useAxios<IAllSubscriptionsResponse>('/admin-api/subscriptions', { method: 'get' });

  const screenLoading = subscriptionService.loading || allSubscriptions.loading || loadingInquiry;

  const onDismiss = () => setSelectedPlan(undefined);

  const onRefresh = useTryCatch(async () => {
    await Promise.all([await subscriptionService.getSubscription(), await allSubscriptions.refetch(), await fetchInquiryReport()]);
  });

  return {
    selectedPlan,
    screenLoading,
    allSubscriptions,
    subscriptionService,
    onDismiss,
    onRefresh,
    setSelectedPlan,
  };
}
