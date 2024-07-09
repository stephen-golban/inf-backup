import React from 'react';
import { useTranslation } from '@library/hooks';

import { Paper } from '@components/ui';
import { MySubscription } from './parts';
import { Divider } from '@components/ui/divider';
import { currencyFormat } from '@library/method';
import { OutlinedButton, ScrollView, Text, View } from '@components/common';
import {
  calculateDiscountedPrice,
  calculateMonthlyEquivalent,
  getPaymentFrequencyText,
  getSubscriptionDurationText,
  sortSubscriptions,
} from './method';

import { SubscriptionInfo } from '@typings/responses/subscriptions/purchased-subscriptions';
import { IAllSubscriptionsResponse, SubscriptionDuration } from '@typings/responses/subscriptions/all-subscriptions';

interface IChangeSubscription {
  subscriptionInfo: SubscriptionInfo;
  allSubscriptions: IAllSubscriptionsResponse | null;
}

const ChangeSubscriptionModule: React.FC<IChangeSubscription> = ({ allSubscriptions, subscriptionInfo }) => {
  const { t } = useTranslation();
  if (!allSubscriptions) {
    return <MySubscription subscriptionInfo={subscriptionInfo} cancelSubscription={() => {}} />;
  }

  const { entityModelList } = allSubscriptions._embedded;
  const sortedEntityModelList = entityModelList.sort(sortSubscriptions);

  return (
    <ScrollView>
      <Text textAlign="center" t18n="profile:my_account:subscription_details:change_subscription" />
      <Divider isHorizontal my="md" bg="gray" />
      <View px="lg">
        {subscriptionInfo.subscriptionId && <MySubscription subscriptionInfo={subscriptionInfo} cancelSubscription={() => {}} />}
        {subscriptionInfo.subscriptionId && (
          <Text variant="14-reg" color="gray" my="md">
            {t('profile:my_account:subscription_details:other_available_options')}
          </Text>
        )}
        {sortedEntityModelList.map(subscription => {
          const discountedPrice = calculateDiscountedPrice(
            subscription.price,
            subscription.discountData.discountAmount,
            subscription.discountData.discountType,
          );
          const monthlyEquivalent = calculateMonthlyEquivalent(discountedPrice, subscription.subscriptionDuration as SubscriptionDuration);
          return (
            <Paper key={subscription.id} br="md" rg="md" shadowOpacity={0.1} mb="md">
              <Text color="gray">{getSubscriptionDurationText(subscription.subscriptionDuration as SubscriptionDuration, t)}</Text>
              <Text variant="20-semi">
                {currencyFormat(discountedPrice)}/
                {getSubscriptionDurationText(subscription.subscriptionDuration as SubscriptionDuration, t).toLowerCase()}
              </Text>
              {(subscription.subscriptionDuration === SubscriptionDuration.MONTH_3 ||
                subscription.subscriptionDuration === SubscriptionDuration.MONTH_6 ||
                subscription.subscriptionDuration === SubscriptionDuration.MONTH_12) && (
                <Text color="gray">
                  {t('profile:my_account:subscription_details:equivalent_to', {
                    amount: currencyFormat(monthlyEquivalent || 0),
                  })}
                  {getPaymentFrequencyText(subscription.subscriptionDuration as SubscriptionDuration, t)}
                </Text>
              )}
              <OutlinedButton
                text={t('profile:my_account:subscription_details:choose_subscription', {
                  duration: getSubscriptionDurationText(subscription.title as SubscriptionDuration, t),
                })}
                textProps={{ variant: '14-reg' }}
              />
              {subscription.discountData.discount && (
                <View top={-10} absolute bg="gold" right={-10} bw={1} bc="white" br={999} px="md" py="xs">
                  <Text style={{ fontSize: 16, fontWeight: '600', textDecorationLine: 'line-through', textDecorationColor: 'red' }}>
                    {currencyFormat(subscription.price)}
                  </Text>
                </View>
              )}
            </Paper>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ChangeSubscriptionModule;
