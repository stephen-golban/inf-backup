import { useMemo } from 'react';
import { isBefore } from 'date-fns';
import { useAppStore } from '@store/app';

function useCurrentSubscriptionExpiryService() {
  const subscription = useAppStore(state => state.subscription);

  const isPurchasedSubscriptionExpired = useMemo(() => {
    if (!subscription) return true;
    const termDateString = subscription.subscriptionAccounts?.[0].termDateTime;
    if (!termDateString) return true;
    const termDate = new Date(termDateString);
    return isBefore(termDate, new Date());
  }, [subscription]);

  return isPurchasedSubscriptionExpired;
}
export { useCurrentSubscriptionExpiryService };
