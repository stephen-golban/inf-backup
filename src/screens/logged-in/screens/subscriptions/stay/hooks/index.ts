import { has } from 'lodash';
import { useMemo, useState } from 'react';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useGetSubscription } from '@services/subscription';

import { calculateDiscountedPrice } from '@modules/logged-in/screens/profile/change-subscription/method';

import { Reason } from '@typings/navigation';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';

type Props = {
  comment: string;
  reason: Reason;
  goToHome: () => void;
  goToRemove: () => void;
};

const useStayScreen = ({ comment, reason, goToHome, goToRemove }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

  const toast = useToast();
  const { getSubscription, loading: subscriptionLoading, subscription } = useGetSubscription(false);
  const [sendFeedback, { loading: feedbackLoading }] = useLazyAxios({ method: 'post', url: `/feedback?type=${reason}` });
  const [removeSubscription, { loading: loadingRemoveSubscription }] = useLazyAxios<string>({
    method: 'post',
    url: '/subscription-management/unsubscribe',
  });

  const hasRetentionOffer = has(subscription, 'retentionOfferDiscount') || (subscription?.retentionOfferMonths ?? 0) > 0;

  const discountedPrice = useMemo(() => {
    if (hasRetentionOffer && subscription) {
      if (subscription?.retentionOfferDiscount) {
        const initialPrice = subscription.price;
        const discountAmount = subscription.retentionOfferDiscount.discountAmount;
        const discountType = subscription.retentionOfferDiscount.discountType;

        return calculateDiscountedPrice(initialPrice, discountAmount, discountType);
      }
    }
  }, [hasRetentionOffer, subscription]);

  const onActivate = () => {
    if (hasRetentionOffer && subscription && discountedPrice) {
      const { id, retentionOfferDiscount } = subscription;
      if (retentionOfferDiscount) {
        setSelectedPlan({ id, price: discountedPrice, discount: retentionOfferDiscount.discountAmount, isAnnual: false });
      }
    }
  };

  const onRemove = useTryCatch(async () => {
    if (subscription) {
      if (reason === Reason.CANCEL_SUBSCRIPTION) {
        await sendFeedback({ message: comment });
        await removeSubscription({ subscriptionId: subscription?.id }, res => toast.show(res, { type: 'success' }));
        await getSubscription();
        goToHome();
      } else {
        goToRemove();
      }
    }
  });

  const onDismiss = () => setSelectedPlan(undefined);

  const removeLoading = feedbackLoading || loadingRemoveSubscription || subscriptionLoading;

  return {
    onRemove,
    onDismiss,
    onActivate,
    selectedPlan,
    removeLoading,
    discountedPrice,
    hasRetentionOffer,
  };
};

export default useStayScreen;
