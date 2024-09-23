import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';

import { calculateDiscountedPrice } from '@modules/logged-in/screens/profile/change-subscription/method';
import { LOGGED_IN_STACK, LOGGED_IN_TABS, Reason, SUBSCRIPTIONS_SCREENS, SubscriptionsStackScreenProps } from '@typings/navigation';
import { useState } from 'react';
import { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';

const useStayScreen = ({ navigation, route }: SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.STAY>) => {
  const type = route.params.reason;
  const { subscription } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

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

  const onActivate = () => {
    if (subscription) {
      setSelectedPlan({
        id: subscription.id,
        price: discountedPrice,
        discount: subscription.discountData.discountAmount,
        isAnnual: false,
      });
    }
  };

  const onDismiss = () => setSelectedPlan(undefined);

  const onSuccess = () => {
    onDismiss();
    navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
  };

  const LOADING = loading || loadingRemoveSubscription;
  return {
    call,
    onDismiss,
    onSuccess,
    onActivate,
    removeSubscription,
    price,
    selectedPlan,
    subscriptionId,
    loading: LOADING,
    discountedPrice,
  };
};

export default useStayScreen;
