import { isAfter } from 'date-fns';
import { useGetSubscription } from '../get';

import { SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

function useSubscriptionValidation() {
  const { getSubscription, loading, subscription } = useGetSubscription(false);

  const validateSubscription = async (): Promise<SUBSCRIPTIONS_SCREENS | null> => {
    const subscription = await getSubscription();

    if (!subscription) {
      return SUBSCRIPTIONS_SCREENS.INDEX;
    }

    const { subscriptionAccounts, trial } = subscription;
    const termDateTime = subscriptionAccounts[0]?.termDateTime;

    if (termDateTime && isAfter(new Date(), new Date(termDateTime))) {
      console.log('expired');
      return SUBSCRIPTIONS_SCREENS.INDEX;
    } else if (trial) {
      return SUBSCRIPTIONS_SCREENS.TRIAL_EXTEND;
    }

    return null; // Indicates a valid subscription
  };

  return { validateSubscription, loading, subscription };
}

export { useSubscriptionValidation };
