import React from 'react';

import useStayScreen from './hooks';
import { usePurchaseSubscriptionService } from '@services/subscription';

import { BottomSheet } from '@components/common';
import { PaymentCardsModule, StayModule } from '@modules/logged-in';

import { LOGGED_IN_STACK, LOGGED_IN_TABS, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackScreenProps } from '@typings/navigation';

const StayScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.STAY>> = ({ navigation, route }) => {
  const { comment, reason } = route.params;

  const goToHome = () => navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
  const goToRemove = () => navigation.navigate(SUBSCRIPTIONS_SCREENS.REMOVE, { comment, reason });

  const hook = useStayScreen({ comment, reason, goToHome, goToRemove });

  const onSuccess = () => {
    hook.onDismiss();
    navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
  };

  const service = usePurchaseSubscriptionService({ selectedPlan: hook.selectedPlan, retentionOffer: true, onSuccess });

  return (
    <>
      <StayModule
        onRemove={hook.onRemove}
        removing={hook.removeLoading}
        onActivateOffer={hook.onActivate}
        offerPrice={hook.discountedPrice}
        screenLoading={hook.screenLoading}
        retentionOffer={hook.retentionOffer}
        purchasing={service.loadingPurchase}
      />
      <BottomSheet isVisible={!!hook.selectedPlan} onDismiss={hook.onDismiss} snapPoints={['75%']}>
        <PaymentCardsModule paymentLoading={service.loadingPayment} onPressContinue={service.onCardSelected} hasAutomaticTermExtension />
      </BottomSheet>
    </>
  );
};

export { StayScreen };
