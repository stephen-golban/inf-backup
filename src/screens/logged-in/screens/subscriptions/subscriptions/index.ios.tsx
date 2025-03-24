import React from 'react';

import { useAppStore } from '@store/app';
import { useGoBack } from '@library/hooks';
import useSubscriptionsScreen from './hooks';

import { SubscriptionsModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, LOGGED_IN_STACK, LOGGED_IN_TABS, Reason, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';
import { useUnmount } from 'react-use';
import { SelectedPlan, useRevenueCat } from '@providers/revenue-cat';

const SubscriptionsScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.INDEX>> = ({ navigation }) => {
  const user = useAppStore(state => state.user);
  const { selectedPlan, screenLoading, allSubscriptions, subscriptionService, onDismiss, onRefresh, ...fns } = useSubscriptionsScreen();

  const onSuccess = () => {
    onDismiss();
    navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
  };

  const onCancelSubscription = () => {
    navigation.navigate(SUBSCRIPTIONS_SCREENS.REASON, { reason: Reason.CANCEL_SUBSCRIPTION });
  };

  const { onSubscriptionPurchase, isLoading } = useRevenueCat();

  const onPressPlan = (plan: SelectedPlan) => {
    onSubscriptionPurchase(plan, onSuccess);
    fns.setSelectedPlan(plan);
  };

  const purchaseLoading = React.useCallback(
    (id: number) => {
      if (id === selectedPlan?.id) {
        return isLoading;
      }
      return false;
    },
    [selectedPlan?.id, isLoading],
  );

  useGoBack(true, navigation.goBack);
  useUnmount(() => fns.setSelectedPlan(undefined));

  return (
    <SubscriptionsModule
      onRefresh={onRefresh}
      loading={screenLoading}
      all={allSubscriptions.data}
      purchaseLoading={purchaseLoading}
      onPressPlan={plan => onPressPlan(plan)}
      onCancelSubscription={onCancelSubscription}
    />
  );
};

export { SubscriptionsScreen };
