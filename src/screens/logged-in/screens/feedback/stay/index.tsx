import React from 'react';
import useStayScreen from './hooks';
import { StayModule } from '@modules/logged-in';
import { noop } from 'lodash';

import { LOGGED_IN_TABS } from '@typings/navigation';
import { FEEDBACK_SCREENS, FeedbackStackScreenProps, Reason } from '@typings/navigation/core/logged-in/screens/feedback';

const StayScreen: React.FC<FeedbackStackScreenProps<FEEDBACK_SCREENS.STAY>> = ({ navigation, route }) => {
  const { loading, call, removeSubscription, discountedPrice, price, subscriptionId } = useStayScreen(route.params.reason);

  const onRemove = async () => {
    if (route.params.reason === Reason.CANCEL_SUBSCRIPTION) {
      await call({ message: route.params.comment });
      await removeSubscription({ subscriptionId });
      navigation.navigate(LOGGED_IN_TABS.HOME as any);
    } else {
      navigation.navigate(FEEDBACK_SCREENS.REMOVE, { comment: route.params.comment, reason: route.params.reason });
    }
  };

  return <StayModule loading={loading} offerPrice={discountedPrice} oldOfferPrice={price} onActivateOffer={noop} onRemove={onRemove} />;
};

export { StayScreen };
