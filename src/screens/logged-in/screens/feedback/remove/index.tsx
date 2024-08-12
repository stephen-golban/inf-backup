import React from 'react';

import { RemoveModule } from '@modules/logged-in';

import { FEEDBACK_SCREENS, FeedbackStackScreenProps } from '@typings/navigation/core/logged-in/screens/feedback';

import { noop } from 'lodash';

const RemoveScreen: React.FC<FeedbackStackScreenProps<FEEDBACK_SCREENS.REMOVE>> = ({ navigation, route }) => {
  return <RemoveModule onRemove={noop} isAvailableSubscription />;
};

export { RemoveScreen };
