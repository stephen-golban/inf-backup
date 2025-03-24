import React from 'react';

import { useGoBack } from '@library/hooks';
import useSubscriptionsScreen from './hooks';
import { usePurchaseSubscriptionService } from '@services/subscription';

import { BottomSheet } from '@components/common';
import { PaymentCardsModule, SubscriptionsModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, LOGGED_IN_STACK, LOGGED_IN_TABS, Reason, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

const SubscriptionsScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.INDEX>> = ({ navigation }) => {
  const { selectedPlan, screenLoading, allSubscriptions, subscriptionService, onDismiss, onRefresh, ...fns } = useSubscriptionsScreen();

  const onSuccess = () => {
    onDismiss();
    navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
  };

  const { loadingPayment, loadingPurchase, onCardSelected } = usePurchaseSubscriptionService({ onSuccess, selectedPlan });

  const onCancelSubscription = () => {
    navigation.navigate(SUBSCRIPTIONS_SCREENS.REASON, { reason: Reason.CANCEL_SUBSCRIPTION });
  };

  useGoBack(true, navigation.goBack);

  return (
    <>
      <SubscriptionsModule
        onRefresh={onRefresh}
        loading={screenLoading}
        all={allSubscriptions.data}
        onPressPlan={fns.setSelectedPlan}
        onCancelSubscription={onCancelSubscription}
        purchaseLoading={id => id === selectedPlan?.id && loadingPurchase}
      />
      <BottomSheet isVisible={!!selectedPlan} onDismiss={onDismiss} snapPoints={['75%']}>
        <PaymentCardsModule paymentLoading={loadingPayment || loadingPurchase} onPressContinue={onCardSelected} hasAutomaticTermExtension />
      </BottomSheet>
    </>
  );
};

export { SubscriptionsScreen };
