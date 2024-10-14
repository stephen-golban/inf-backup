import { useAppStore } from '@store/app';
import { useTranslation } from '@library/hooks';
import { useEffect, useMemo, useState } from 'react';
import { sortBy, reduce, omit, isEmpty, filter, map } from 'lodash';
import { useCurrentSubscriptionExpiryService } from '@services/subscription';

import type { I18nKey } from '@translations/locales';
import type { RenderedPlans, RenderedSubscription } from '../type';
import type { IAllSubscriptionsResponse } from '@typings/responses';

export default function useSubscriptionsModule(data: IAllSubscriptionsResponse | undefined) {
  const { t } = useTranslation();
  const purchased = useAppStore(state => state.subscription);
  const isPurchasedSubscriptionExpired = useCurrentSubscriptionExpiryService();

  const [subscriptions, setSubscriptions] = useState<RenderedSubscription[] | null>(null);

  const getTag = (tag: string) => t(`subscriptions:index:comparison:interval:${tag}` as I18nKey);
  const getFeature = (feature: string) => t(`subscriptions:index:comparison:features:${feature}` as I18nKey);

  useEffect(() => {
    if (!data) return;

    const filteredSubscriptions = filter(data._embedded.entityModelList, subscription =>
      ['Smart', 'Genius', 'Premium'].includes(subscription.title),
    );

    const transformedSubscriptions = map(filteredSubscriptions, subscription => ({
      isAnnual: false,
      id: subscription.id,
      price: subscription.price,
      calculatedPrice: subscription.price,
      isPremium: subscription.title === 'Premium',
      plan: `${subscription.title.toLowerCase().replace(' ', '_')}_plan`,
      isActive: subscription.id === purchased?.id && !isPurchasedSubscriptionExpired,
      discount: subscription.discountData ? subscription.discountData.discountAmount : 0,
    }));

    const sortedSubscriptions = sortBy(transformedSubscriptions, [sub => (sub.plan === 'smart_plan' ? 0 : 1), 'price']);

    setSubscriptions(sortedSubscriptions);
  }, [data]);

  const plans = useMemo(() => {
    if (isEmpty(subscriptions)) return {};

    const plans = reduce(
      subscriptions,
      (acc, subscription) => {
        const planKey = subscription.plan;
        if (planKey !== 'payment_only' && subscription.price > 0) {
          acc[planKey] = {
            id: subscription.id,
            isActive: subscription.isActive,
            isAnnual: subscription.isAnnual,
            name: t(`subscriptions:index:comparison:plans:${planKey}` as I18nKey),
            features: [
              { title: getFeature('1'), disabled: false, hasInfo: false, tag: undefined },
              { title: getFeature('2'), disabled: false, hasInfo: false, tag: undefined },
              {
                title: getFeature('3'),
                disabled: false,
                hasInfo: planKey !== 'premium_plan',
                tag: planKey === 'premium_plan' ? getTag('unlimited') : undefined,
              },
              { title: getFeature('4'), disabled: false, hasInfo: false, tag: undefined },
              {
                title: getFeature('5'),
                disabled: planKey === 'smart_plan',
                hasInfo: planKey === 'genius_plan',
                tag: planKey === 'premium_plan' ? getTag('unlimited') : undefined,
              },
              { title: getFeature('6'), disabled: planKey === 'smart_plan', hasInfo: false, tag: undefined },
              { title: getFeature('7'), disabled: false, hasInfo: false, tag: undefined },
              { title: getFeature('8'), disabled: false, hasInfo: false, tag: getTag(planKey === 'smart_plan' ? 'monthly' : 'weekly') },
              { title: getFeature('9'), disabled: false, hasInfo: planKey !== 'premium_plan', tag: undefined },
            ],
            discount: subscription.discount,
            price: subscription.calculatedPrice,
          };
        }
        return acc;
      },
      {} as RenderedPlans,
    );

    return {
      ...(plans.smart_plan && { smart_plan: plans.smart_plan }),
      ...omit(plans, 'smart_plan'),
    };
  }, [t, getTag, getFeature, subscriptions]);

  return { subscriptions, plans, setSubscriptions };
}
