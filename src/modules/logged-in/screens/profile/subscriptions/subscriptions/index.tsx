import React from 'react';

import { Screen, Text, View } from '@components/common';
import { ComparisionTabs, Faq, SubscriptionCard } from './parts';

import { SUBSCRIPTIONS_MOCK } from './mock';

import type { IAllSubscriptionsResponse, PurchasedSubscription } from '@typings/responses';

interface ISubscriptionsModule {
  loading?: boolean;
  onRefresh?(): void;
  all: IAllSubscriptionsResponse | undefined;
  purschased: PurchasedSubscription | undefined;
}

const SubscriptionsModule: React.FC<ISubscriptionsModule> = ({ all, purschased, loading, onRefresh }) => {
  const [selectedPlan, setSelectedPlan] = React.useState<string>('smart');

  console.log(all?._embedded.entityModelList);

  return (
    <Screen scroll unsafe style={{ padding: 16 }} bg="white" loading={loading} onRefresh={onRefresh}>
      <Text t18n="profile:subscriptions:index:title" variant="24-bold" color="blue" textAlign="center" />
      <Text t18n="profile:subscriptions:index:subtitle" variant="14-semi" color="blue" textAlign="center" />
      <View my="lg" rg="lg">
        {SUBSCRIPTIONS_MOCK.map((subscription, idx) => (
          <SubscriptionCard key={'subscription-card-' + idx} {...subscription} />
        ))}
        <Text t18n="profile:subscriptions:index:discount_note" variant="14-reg" color="darkGray" textAlign="justify" lineHeight={24} />
        <ComparisionTabs selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        <Faq />
      </View>
    </Screen>
  );
};

export { SubscriptionsModule };
