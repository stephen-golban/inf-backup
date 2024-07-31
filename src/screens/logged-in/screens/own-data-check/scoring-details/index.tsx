import React from 'react';

import { ScoringDetailsModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const ScoringDetailsScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>> = ({ route }) => {
  const score = route.params?.data;
  return <ScoringDetailsModule score={score?.scoreValue} />;
};

export { ScoringDetailsScreen };
