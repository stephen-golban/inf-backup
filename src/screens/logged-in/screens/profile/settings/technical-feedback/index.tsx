import React from 'react';

import useTechnicalFeedbackScreen from './hooks';
import { TechnicalFeedbackModule } from '@modules/logged-in';

import { type SettingsStackScreenProps, SETTINGS_SCREENS } from '@typings/navigation';

const TechnicalFeedback: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.TECHNICAL_FEEDBACK>> = () => {
  const { loading, onSubmit } = useTechnicalFeedbackScreen();

  return <TechnicalFeedbackModule onSubmit={onSubmit} loading={loading} />;
};

export { TechnicalFeedback };
