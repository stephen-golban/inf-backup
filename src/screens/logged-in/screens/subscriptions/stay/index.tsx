import React from 'react';

import useStayScreen from './hooks';
import { usePurchaseSubscriptionService } from '@services/subscription';

import { BottomSheet } from '@components/common';
import { PaymentCardsModule, StayModule } from '@modules/logged-in';

import { LOGGED_IN_STACK, LOGGED_IN_TABS, Reason, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackScreenProps } from '@typings/navigation';

const StayScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.STAY>> = props => {
  const { navigation, route } = props;
  const { loading, discountedPrice, price, subscriptionId, selectedPlan, ...fns } = useStayScreen(props);

  const { loadingPayment, loadingPurchase, onCardSelected } = usePurchaseSubscriptionService({
    selectedPlan,
    retentionOffer: true,
    onSuccess: fns.onSuccess,
  });

  const onRemove = async () => {
    if (route.params.reason === Reason.CANCEL_SUBSCRIPTION) {
      await fns.call({ message: route.params.comment });
      await fns.removeSubscription({ subscriptionId });
      navigation.navigate(LOGGED_IN_STACK.TABS, { screen: LOGGED_IN_TABS.HOME });
    } else {
      navigation.navigate(SUBSCRIPTIONS_SCREENS.REMOVE, { comment: route.params.comment, reason: route.params.reason });
    }
  };

  return (
    <>
      <StayModule
        loading={loading}
        loadingPurchase={loadingPurchase}
        offerPrice={discountedPrice}
        oldOfferPrice={price}
        onActivateOffer={fns.onActivate}
        onRemove={onRemove}
      />
      <BottomSheet isVisible={!!selectedPlan} onDismiss={fns.onDismiss} snapPoints={['75%']}>
        <PaymentCardsModule paymentLoading={loadingPayment} onPressContinue={onCardSelected} hasAutomaticTermExtension />
      </BottomSheet>
    </>
  );
};

export { StayScreen };
