import React from 'react';

import { TellUsMoreModule } from '@modules/logged-in';

import { FEEDBACK_SCREENS, FeedbackStackScreenProps } from '@typings/navigation/core/logged-in/screens/feedback';

const TellUsMore: React.FC<FeedbackStackScreenProps<FEEDBACK_SCREENS.TELL_US_MORE>> = ({ navigation, route }) => {
  const { reason } = route.params;
  return <TellUsMoreModule onSubmit={({ comment }) => navigation.navigate(FEEDBACK_SCREENS.STAY, { comment, reason })} />;
};

export { TellUsMore };
