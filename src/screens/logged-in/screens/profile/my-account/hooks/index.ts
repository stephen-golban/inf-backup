import { useState } from 'react';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { PurchasedSubscriptionsResponse } from '@typings/responses/subscriptions/purchased-subscriptions';

const useMyAccountScreen = () => {
  const [mySubscription, setMySubscription] = useState<PurchasedSubscriptionsResponse | null>(null);
  const [allSubscriptions, setAllSubscriptions] = useState<PurchasedSubscriptionsResponse | null>(null);

  const [call, { loading: loadPurchased }] = useLazyAxios({
    method: 'get',
    url: '/admin-api/subscriptions/purchased',
  });

  const [getAllSubscriptions, { loading: loadPayments }] = useLazyAxios({
    method: 'get',
    url: '/admin-api/subscriptions',
  });

  const loading = loadPayments || loadPurchased;

  useMount(() => {
    call(undefined, res => setMySubscription(res as PurchasedSubscriptionsResponse));
    getAllSubscriptions(undefined, res => setAllSubscriptions(res as PurchasedSubscriptionsResponse));
  });

  const subscriptionDetails = mySubscription?._embedded?.entityModelList?.[0];
  const nextPaymentDate = subscriptionDetails?.subscriptionAccounts?.[0]?.termDateTime;
  const subscriptionName = subscriptionDetails?.title;
  const subscriptionPrice = subscriptionDetails?.price;
  const subscriptionDuration = subscriptionDetails?.subscriptionDuration;
  const subscriptionId = subscriptionDetails?.id;

  const subscriptionInfo = {
    name: subscriptionName,
    price: subscriptionPrice,
    nextPayment: nextPaymentDate,
    subscriptionDuration,
    subscriptionId,
  };

  return {
    loading,
    allSubscriptions,
    subscriptionInfo,
  };
};

export default useMyAccountScreen;
