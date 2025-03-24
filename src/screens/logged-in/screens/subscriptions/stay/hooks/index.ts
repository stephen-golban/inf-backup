import { useState } from 'react';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useGetSubscription } from '@services/subscription';
import { openBrowserAsync } from '@library/method';
import useRetentionSubscription from './use-retention-subscription';

import { Reason } from '@typings/navigation';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';
import { useRevenueCat } from '@providers/revenue-cat';

type Props = {
  comment: string;
  reason: Reason;
  goToHome: () => void;
  goToRemove: () => void;
};

const useStayScreen = ({ comment, reason, goToHome, goToRemove }: Props) => {
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>();

  const { retentionOffer, discountedPrice, loading: screenLoading } = useRetentionSubscription();

  const toast = useToast();
  const { onCancelSubscription } = useRevenueCat();
  const { getSubscription, loading: subscriptionLoading, subscription } = useGetSubscription(false);
  const [sendFeedback, { loading: feedbackLoading }] = useLazyAxios({ method: 'post', url: `/feedback?type=${reason}` });
  const [removeSubscription, { loading: loadingRemoveSubscription }] = useLazyAxios<string>({
    method: 'post',
    url: '/subscription-management/unsubscribe',
  });

  const onActivate = () => {
    if (retentionOffer && subscription && discountedPrice) {
      if (retentionOffer.discount) {
        const { discount, id } = retentionOffer;
        setSelectedPlan({
          id,
          price: discountedPrice,
          discount: discount.discountAmount,
          isAnnual: false,
          name: 'retention',
        });
      }
    }
  };

  const onRemove = useTryCatch(async () => {
    if (subscription) {
      if (reason === Reason.CANCEL_SUBSCRIPTION) {
        // Send feedback first
        await sendFeedback({ message: comment });

        // Process the cancellation with backend
        await removeSubscription({ subscriptionId: subscription?.id }, res => toast.show(res, { type: 'success' }));

        // Update subscription data
        await getSubscription();

        // Navigate to home
        goToHome();

        // After navigating home, get and open the management URL from RevenueCat
        await onCancelSubscription();
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
    screenLoading,
    removeLoading,
    discountedPrice,
    retentionOffer,
  };
};

export default useStayScreen;
