import React from 'react';
import { format } from 'date-fns';
import { useAppStore } from '@store/app';

import { ro, ru, enGB } from 'date-fns/locale';

import { currencyFormat } from '@library/method';
import { Divider } from '@components/ui/divider';
import { OutlinedButton, Text, View } from '@components/common';
import { SubscriptionInfo } from '@typings/responses/subscriptions/purchased-subscriptions';

interface ISubscriptionDetails {
  subscriptionInfo: SubscriptionInfo;
  onRemoveAccount(): void;
  onChangeSubscription(): void;
}

const SubscriptionDetails: React.FC<ISubscriptionDetails> = props => {
  const { subscriptionInfo, onRemoveAccount, onChangeSubscription } = props;
  const { locale } = useAppStore();
  const processedLocale = locale === 'ro' ? ro : locale === 'ru' ? ru : enGB;
  return (
    <View my="sm">
      <Text px="md" variant="16-reg" t18n="profile:my_account:subscription_details:title" />

      <View my="md" bg="lightBlue" btw={1.2} bbw={1.2} bc="blue">
        <View p="md" bbw={1.2} bc="blue" row between>
          <Text variant="14-reg"> {subscriptionInfo.name}</Text>
          <Text variant="14-reg">{currencyFormat(subscriptionInfo.price!)}</Text>
        </View>
        <View p="md" row between>
          <Text variant="14-reg" t18n="profile:my_account:subscription_details:next_payment" />
          <Text variant="14-reg">{format(subscriptionInfo.nextPayment || new Date(), 'dd MMMM yyyy', { locale: processedLocale })}</Text>
        </View>
      </View>
      <Text px="lg" mb="md" variant="12-reg" t18n="profile:my_account:subscription_details:unlimited_access" center />

      <OutlinedButton
        t18n="profile:my_account:subscription_details:change_subscription"
        mx="xxl"
        textProps={{ variant: '14-reg' }}
        onPress={onChangeSubscription}
      />
      <Divider isHorizontal bg="blue" h={1.2} mt="xxxl" />
      <OutlinedButton
        mt="xl"
        t18n="profile:my_account:remove_account"
        mx="xxl"
        textProps={{ variant: '14-reg' }}
        onPress={onRemoveAccount}
      />
    </View>
  );
};

export { SubscriptionDetails };
