import React from 'react';

import { ReasonModule } from '@modules/logged-in';

import { LOGGED_IN_TABS, Reason, SUBSCRIPTIONS_SCREENS, type SubscriptionsStackScreenProps } from '@typings/navigation';

const reasonKeys = [
  'no_relevant_info',
  'subscription_too_expensive',
  'not_understandable_info',
  'dislike_app',
  'technical_issues',
  'other_reason',
];

const ReasonScreen: React.FC<SubscriptionsStackScreenProps<SUBSCRIPTIONS_SCREENS.REASON>> = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = React.useState<string | null>(null);

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
  };

  return (
    <ReasonModule
      reasonKeys={reasonKeys}
      selectedReason={selectedReason}
      handleSelectReason={handleSelectReason}
      onStay={() => navigation.navigate(LOGGED_IN_TABS.HOME as never)}
      tellMore={() => navigation.navigate(SUBSCRIPTIONS_SCREENS.TELL_US_MORE, { reason: Reason.CANCEL_SUBSCRIPTION })}
      proceedToCancel={() =>
        navigation.navigate(SUBSCRIPTIONS_SCREENS.STAY, { comment: selectedReason!, reason: Reason.CANCEL_SUBSCRIPTION })
      }
    />
  );
};

export { ReasonScreen };
