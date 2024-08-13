import { isEmpty } from 'lodash';
import { parseISO } from 'date-fns';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTranslation, useTryCatchWithCallback } from '@library/hooks';
import { getMaxTermDateTimeEntity } from './util';
import { useToast } from 'react-native-toast-notifications';
import { setAppSubscription, useAppStore } from '@store/app';

import type { PurchasedSubscriptionsResponse } from '@typings/responses';

const useGetSubscription = (runOnMount = false) => {
  const toast = useToast();
  const { t } = useTranslation();
  const subscription = useAppStore(state => state.subscription);

  const [call, { loading }] = useLazyAxios<PurchasedSubscriptionsResponse>('/admin-api/subscriptions/purchased', {
    method: 'get',
  });

  const getSubscription = useTryCatchWithCallback(async () => {
    const response = await call();

    if (!response) {
      throw new Error(t('ui:toasts:no_response_from_server'));
    }

    const currentSubscriptionList = response._embedded?.entityModelList ?? [];
    const lastPurchasedSubscription = getMaxTermDateTimeEntity(currentSubscriptionList);

    if (isEmpty(lastPurchasedSubscription)) {
      toast.show(t('ui:toasts:no_subscription_purchased'), {
        type: 'danger',
      });
      return;
    }

    const termDateTime = lastPurchasedSubscription?.subscriptionAccounts[0].termDateTime ?? '';

    if (!termDateTime) {
      throw new Error(t('ui:toasts:no_valid_term_date'));
    }

    const termDate = parseISO(termDateTime);
    const currentDate = new Date();

    if (currentDate > termDate) {
      toast.show(t('ui:toasts:subscription_expired'), {
        type: 'danger',
      });
      return;
    }

    return lastPurchasedSubscription;
  }, [call, t, toast]);

  if (runOnMount) {
    useMount(async () => {
      const res = await getSubscription();
      if (res) {
        setAppSubscription(res);
      }
    });
  }

  return { subscription, loading, getSubscription };
};

export { useGetSubscription };
