import { useAxios } from '@api/hooks';
import { useGetSubscription } from '@services/subscription';

import type { PurchasedSubscriptionsResponse } from '@typings/responses';

const useMyAccountScreen = () => {
  const mySubscription = useGetSubscription();

  const allSubscriptions = useAxios<PurchasedSubscriptionsResponse>({
    method: 'get',
    url: '/admin-api/subscriptions',
  });

  const loading = allSubscriptions.loading || mySubscription.loading;

  const nextPaymentDate = mySubscription.subscription?.subscriptionAccounts?.[0]?.termDateTime;
  const subscriptionName = mySubscription.subscription?.title;
  const subscriptionPrice = mySubscription.subscription?.price;
  const subscriptionDuration = mySubscription.subscription?.subscriptionDuration;
  const subscriptionId = mySubscription.subscription?.id;

  const subscriptionInfo = {
    name: subscriptionName,
    price: subscriptionPrice,
    nextPayment: nextPaymentDate,
    subscriptionDuration,
    subscriptionId,
  };

  async function refetch() {
    await Promise.all([mySubscription.getSubscription(), allSubscriptions.refetch()]);
  }

  return {
    loading,
    refetch,
    subscriptionInfo,
    allSubscriptions: allSubscriptions.data,
  };
};

export default useMyAccountScreen;
