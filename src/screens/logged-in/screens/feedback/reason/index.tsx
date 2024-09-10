import React, { useState } from 'react';
import { useGoBack } from '@library/hooks';
import { ReasonModule } from '@modules/logged-in';

import { FEEDBACK_SCREENS, FeedbackStackScreenProps, Reason } from '@typings/navigation/core/logged-in/screens/feedback';
import { LOGGED_IN_TABS } from '@typings/navigation';

const ReasonScreen: React.FC<FeedbackStackScreenProps<FEEDBACK_SCREENS.REASON>> = ({ navigation }) => {
  useGoBack(true, navigation.goBack);

  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const reasonKeys = [
    'no_relevant_info',
    'subscription_too_expensive',
    'not_understandable_info',
    'dislike_app',
    'technical_issues',
    'other_reason',
  ];

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
  };

  return (
    <ReasonModule
      reasonKeys={reasonKeys}
      handleSelectReason={handleSelectReason}
      onStay={() => navigation.navigate(LOGGED_IN_TABS.HOME as never)}
      tellMore={() => navigation.navigate(FEEDBACK_SCREENS.TELL_US_MORE, { reason: Reason.CANCEL_SUBSCRIPTION })}
      proceedToCancel={reason => navigation.navigate(FEEDBACK_SCREENS.STAY, { comment: reason!, reason: Reason.CANCEL_SUBSCRIPTION })}
    />
  );
};

export { ReasonScreen };
