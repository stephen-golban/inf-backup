import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';

import { calculateDiscountedPrice } from '@modules/logged-in/screens/profile/change-subscription/method';

import { Reason } from '@typings/navigation/core/logged-in/screens/feedback';

const useStayScreen = (type: Reason) => {
  const { subscription } = useAppStore();
  const price = subscription?.price;
  const subscriptionId = subscription?.id;

  const discountedPrice = calculateDiscountedPrice(
    subscription?.price!,
    subscription?.discountData.discountAmount!,
    subscription?.discountData.discountType!,
  );

  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: `/feedback?type=${type}`,
  });

  const [removeSubscription, { loading: loadingRemoveSubscription }] = useLazyAxios({
    method: 'post',
    url: '/subscription-management/unsubscribe',
  });

  const LOADING = loading || loadingRemoveSubscription;
  return {
    call,
    removeSubscription,
    price,
    subscriptionId,
    loading: LOADING,
    discountedPrice,
  };
};

export default useStayScreen;
