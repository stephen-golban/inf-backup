import React from 'react';

import { TellUsMoreModule } from '@modules/logged-in';

import { SUBSCRIPTIONS_SCREENS, type SubscriptionsStackScreenProps } from '@typings/navigation';

const TellUsMore: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.TELL_US_MORE>> = ({ navigation, route }) => {
  const { reason } = route.params;
  return <TellUsMoreModule onSubmit={({ comment }) => navigation.navigate(SUBSCRIPTIONS_SCREENS.STAY, { comment, reason })} />;
};

export { TellUsMore };
