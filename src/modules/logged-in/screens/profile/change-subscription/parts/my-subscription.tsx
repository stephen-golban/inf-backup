import React from 'react';
import { Paper } from '@components/ui';
import { useTranslation } from '@library/hooks';
import { Divider } from '@components/ui/divider';
import { currencyFormat } from '@library/method';
import { OutlinedButton, Text, View } from '@components/common';
import { getPaymentFrequencyText, getSubscriptionDurationText } from '../method';
import { SubscriptionInfo } from '@typings/responses/subscriptions/purchased-subscriptions';

interface IMySubscription {
  showHeader?: boolean;
  cancelSubscription(id: string): void;
  subscriptionInfo: SubscriptionInfo;
}

const MySubscription: React.FC<IMySubscription> = ({ showHeader = false, subscriptionInfo, cancelSubscription }) => {
  const { t } = useTranslation();
  return (
    <View>
      {showHeader && (
        <View>
          <Text textAlign="center" t18n="profile:my_account:subscription_details:change_subscription" />
          <Divider isHorizontal my="md" bg="gray" />
        </View>
      )}
      <View px={showHeader ? 'lg' : 'zero'}>
        <Text variant="14-reg" color="gray" my="md" t18n="profile:my_account:subscription_details:current_subscription" />
        <Paper br="md" rg="sm" shadowOpacity={0.1}>
          <Text color="gray">{getSubscriptionDurationText(subscriptionInfo.subscriptionDuration!, t)}</Text>
          <Text variant="20-semi">
            {currencyFormat(subscriptionInfo.price || '')}/{getSubscriptionDurationText(subscriptionInfo.subscriptionDuration!, t)}
          </Text>
          <Text color="gray">{getPaymentFrequencyText(subscriptionInfo.subscriptionDuration!, t)}</Text>
          <OutlinedButton
            t18n="profile:my_account:subscription_details:cancel_subscription"
            textProps={{ variant: '14-reg' }}
            onPress={() => cancelSubscription(String(subscriptionInfo.subscriptionId!))}
          />
        </Paper>
      </View>
    </View>
  );
};

export { MySubscription };
