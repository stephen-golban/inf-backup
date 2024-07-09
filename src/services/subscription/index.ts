import { isEmpty } from 'lodash';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { getMaxTermDateTimeEntity } from './util';
import { useToast } from 'react-native-toast-notifications';
import { setAppSubscription, useAppStore } from '@store/app';

import type { PurchasedSubscriptionsResponse } from '@typings/responses';
import { parseISO } from 'date-fns';
import { useTranslation } from '@library/hooks';

const useGetSubscription = (runOnMount = false) => {
  const toast = useToast();
  const { t } = useTranslation();
  const subscription = useAppStore(state => state.subscription);

  const [call, { loading }] = useLazyAxios<PurchasedSubscriptionsResponse>('/admin-api/subscriptions/purchased', {
    method: 'get',
  });

  const getSubscription = async () => {
    const response = await call();

    if (response) {
      const currentSubscriptionList = response._embedded?.entityModelList ?? [];
      const lastPurchasedSubscription = getMaxTermDateTimeEntity(currentSubscriptionList);

      const termDateTime = lastPurchasedSubscription?.subscriptionAccounts[0].termDateTime ?? '';
      const currentDate = new Date();
      const termDate = termDateTime !== '' ? parseISO(termDateTime) : '';

      if (isEmpty(lastPurchasedSubscription)) {
        toast.show(t('ui:toasts:no_subscription_purchased'), {
          type: 'danger',
        });
        return;
      }
      if (currentDate > termDate) {
        toast.show(t('ui:toasts:subscription_expired'), {
          type: 'danger',
        });
        return;
      }
      return lastPurchasedSubscription;
    }
  };

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
