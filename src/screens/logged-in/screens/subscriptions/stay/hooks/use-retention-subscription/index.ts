import { useMemo } from 'react';
import { useAxios } from '@api/hooks';
import { useAppStore } from '@store/app';
import { calculateDiscountedPrice } from '@modules/logged-in/screens/profile/change-subscription/method';

import type { IAllSubscriptionsResponse } from '@typings/responses';

export default function useRetentionSubscription() {
  const subscription = useAppStore(state => state.subscription);
  const { data, loading } = useAxios<IAllSubscriptionsResponse>('/admin-api/subscriptions', { method: 'get' });

  const retentionSubscription = data?._embedded.entityModelList.find(item => item.retentionOfferDiscount);

  const retentionOffer = useMemo(() => {
    if (retentionSubscription) {
      const { retentionOfferDiscount, retentionOfferMonths } = retentionSubscription;

      return {
        months: retentionOfferMonths,
        discount: retentionOfferDiscount,
      };
    }
    return;
  }, [retentionSubscription]);

  const discountedPrice = useMemo(() => {
    if (subscription && retentionOffer) {
      if (retentionOffer.discount) {
        const initialPrice = subscription.price;
        const discountAmount = retentionOffer.discount.discountAmount;
        const discountType = retentionOffer.discount.discountType;

        return calculateDiscountedPrice(initialPrice, discountAmount, discountType);
      }
    }
  }, [subscription, retentionOffer]);

  return { retentionOffer, loading, discountedPrice };
}
