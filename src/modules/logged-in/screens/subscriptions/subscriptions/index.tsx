import React from 'react';

import useSubscriptionsModule from './hooks';

import { Screen, Text, View } from '@components/common';
import { ComparisionTabs, Faq, SubscriptionCard } from './parts';

import type { SelectedPlan } from './type';
import type { IAllSubscriptionsResponse, PurchasedSubscription } from '@typings/responses';

interface ISubscriptionsModule {
  loading?: boolean;
  onRefresh?(): void;
  onCancelSubscription(): void;
  onPressPlan(val: SelectedPlan): void;
  purchaseLoading?: (id: number) => boolean;
  all: IAllSubscriptionsResponse | undefined;
  purschased: PurchasedSubscription | undefined;
}

const SubscriptionsModule: React.FC<ISubscriptionsModule> = ({
  all,
  loading,
  purschased,
  onRefresh,
  onPressPlan,
  purchaseLoading,
  onCancelSubscription,
}) => {
  const { subscriptions, plans, setSubscriptions } = useSubscriptionsModule(all, purschased);

  return (
    <Screen scroll unsafe style={{ padding: 16 }} bg="white" loading={loading || !subscriptions} onRefresh={onRefresh}>
      <Text t18n="subscriptions:index:title" variant="24-bold" color="blue" textAlign="center" />
      <Text t18n="subscriptions:index:subtitle" variant="14-semi" color="blue" textAlign="center" />
      <View my="lg" rg="lg">
        {subscriptions?.map(subscription => (
          <SubscriptionCard
            key={subscription.id}
            {...subscription}
            onSelectPlan={onPressPlan}
            setSubscriptions={setSubscriptions}
            onPressCancel={onCancelSubscription}
            loading={purchaseLoading?.(subscription.id)}
          />
        ))}
        <Text t18n="subscriptions:index:discount_note" variant="14-reg" color="darkGray" textAlign="justify" lineHeight={24} />
        <ComparisionTabs
          data={plans}
          setSelectedPlan={onPressPlan}
          purchaseLoading={purchaseLoading}
          onCancelSubscription={onCancelSubscription}
        />
        <Faq />
      </View>
    </Screen>
  );
};

export { SubscriptionsModule };
