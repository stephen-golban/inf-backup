import React from 'react';

import { format } from 'date-fns';
import { useAppStore } from '@store/app';

import { ro, ru, enGB } from 'date-fns/locale';

import { currencyFormat } from '@library/method';
import { OutlinedButton, Text, View } from '@components/common';
import { useCurrentSubscriptionExpiryService } from '@services/subscription';

interface ISubscriptionDetails {
  onChangeSubscription(): void;
}

const SubscriptionDetails: React.FC<ISubscriptionDetails> = props => {
  const { onChangeSubscription } = props;

  const isExpired = useCurrentSubscriptionExpiryService();
  const { locale, subscription } = useAppStore(state => state);

  const processedLocale = locale === 'ro' ? ro : locale === 'ru' ? ru : enGB;

  const nextPayment = subscription?.subscriptionAccounts?.[0]?.termDateTime;
  const isTrial = subscription?.trial;

  return (
    <View my="sm">
      <Text px="md" variant="16-reg" t18n="profile:my_account:subscription_details:title" />
      {subscription && !isExpired ? (
        <View>
          <View my="md" bg="lightBlue" btw={1.2} bbw={1.2} bc="blue">
            <View p="md" bbw={1.2} bc="blue" row between>
              <Text variant="14-reg"> {subscription.title}</Text>
              <Text variant="14-reg">{subscription.price > 0 && currencyFormat(subscription.price)}</Text>
            </View>
            <View p="md" row between>
              <Text variant="14-reg" t18n="profile:my_account:subscription_details:next_payment" />
              <Text variant="14-reg">{format(nextPayment || new Date(), 'dd MMMM yyyy', { locale: processedLocale })}</Text>
            </View>
          </View>
          <Text px="lg" mb="md" variant="12-reg" t18n="profile:my_account:subscription_details:unlimited_access" center />
        </View>
      ) : (
        <View btw={1} bbw={1} my="md" bg="lightBlue">
          <Text variant="14-mid" center my="md" t18n="profile:my_account:subscription_details:inactive_subscription" />
        </View>
      )}

      <OutlinedButton
        t18n={
          !subscription
            ? 'profile:my_account:subscription_details:purchase_subscription'
            : isTrial || isExpired
              ? 'profile:my_account:subscription_details:purchase_subscription'
              : 'profile:my_account:subscription_details:change_subscription'
        }
        mx="xxl"
        textProps={{ variant: '14-reg' }}
        onPress={onChangeSubscription}
      />
    </View>
  );
};

export { SubscriptionDetails };
