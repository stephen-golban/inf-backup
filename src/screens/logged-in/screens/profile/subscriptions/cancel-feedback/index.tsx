import React from 'react';

import { CancelFeedbackModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

const CancelFeedbackScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.CANCEL_FEEDBACK>> = ({ navigation }) => {
  return <CancelFeedbackModule />;
};

export { CancelFeedbackScreen };
