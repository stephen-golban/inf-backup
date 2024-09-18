import React from 'react';

import useSubscriptionsModule from './hooks';

import { Screen, Text, View } from '@components/common';
import { ComparisionTabs, Faq, SubscriptionCard } from './parts';

import type { IAllSubscriptionsResponse, PurchasedSubscription } from '@typings/responses';

interface ISubscriptionsModule {
  loading?: boolean;
  onRefresh?(): void;
  onCancelSubscription(): void;
  all: IAllSubscriptionsResponse | undefined;
  purschased: PurchasedSubscription | undefined;
}

const SubscriptionsModule: React.FC<ISubscriptionsModule> = ({ all, purschased, loading, onCancelSubscription, onRefresh }) => {
  const { subscriptions, plans, selectedPlan, setSelectedPlan, setSubscriptions } = useSubscriptionsModule(all, purschased);

  return (
    <Screen scroll unsafe style={{ padding: 16 }} bg="white" loading={loading || !subscriptions} onRefresh={onRefresh}>
      <Text t18n="subscriptions:index:title" variant="24-bold" color="blue" textAlign="center" />
      <Text t18n="subscriptions:index:subtitle" variant="14-semi" color="blue" textAlign="center" />
      <View my="lg" rg="lg">
        {subscriptions?.map(subscription => (
          <SubscriptionCard
            key={subscription.id}
            {...subscription}
            onSelectPlan={setSelectedPlan}
            setSubscriptions={setSubscriptions}
            onPressCancel={onCancelSubscription}
          />
        ))}
        <Text t18n="subscriptions:index:discount_note" variant="14-reg" color="darkGray" textAlign="justify" lineHeight={24} />
        <ComparisionTabs data={plans} setSelectedPlan={setSelectedPlan} onCancelSubscription={onCancelSubscription} />
        <Faq />
      </View>
    </Screen>
  );
};

export { SubscriptionsModule };
