import React from 'react';

import { useGoBack } from '@library/hooks';
import useSubscriptionsScreen from './hooks';

import { BottomSheet } from '@components/common';
import { PaymentCardsModule, SubscriptionsModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, Reason, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';
import { usePurchaseSubscriptionService } from '@services/subscription';

const SubscriptionsScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.INDEX>> = ({ navigation }) => {
  const { selectedPlan, screenLoading, allSubscriptions, subscriptionService, onSuccess, ...fns } = useSubscriptionsScreen();

  const { loadingPayment, loadingPurchase, onCardSelected } = usePurchaseSubscriptionService({ onSuccess, selectedPlan });

  const onCancelSubscription = () => {
    navigation.navigate(SUBSCRIPTIONS_SCREENS.REASON, { reason: Reason.CANCEL_SUBSCRIPTION });
  };

  useGoBack(true, navigation.goBack);

  return (
    <>
      <SubscriptionsModule
        onRefresh={fns.onRefresh}
        loading={screenLoading}
        all={allSubscriptions.data}
        onPressPlan={fns.setSelectedPlan}
        onCancelSubscription={onCancelSubscription}
        purschased={subscriptionService.subscription}
        purchaseLoading={id => id === selectedPlan?.id && loadingPurchase}
      />
      <BottomSheet isVisible={!!selectedPlan} onDismiss={fns.onDismiss} snapPoints={['75%']}>
        <PaymentCardsModule paymentLoading={loadingPayment} onPressContinue={onCardSelected} hasAutomaticTermExtension />
      </BottomSheet>
    </>
  );
};

export { SubscriptionsScreen };
