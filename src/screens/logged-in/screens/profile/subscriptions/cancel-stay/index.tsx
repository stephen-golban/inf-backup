import React from 'react';

import { CancelStayModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

const CancelStayScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.CANCEL_STAY>> = ({ navigation }) => {
  return <CancelStayModule />;
};

export { CancelStayScreen };
