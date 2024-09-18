import React from 'react';

import { TrialExtendModule } from '@modules/logged-in';

import { type SubscriptionsStackScreenProps, SUBSCRIPTIONS_SCREENS } from '@typings/navigation';

const TrialExtendScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.TRIAL_EXTEND>> = ({ navigation }) => {
  return <TrialExtendModule />;
};

export { TrialExtendScreen };
