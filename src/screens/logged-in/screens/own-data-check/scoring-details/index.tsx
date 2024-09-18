import React from 'react';

import { useCreditScoreService } from '@services/credit-score';

import { ScoringDetailsModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';

const ScoringDetailsScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>> = () => {
  const { creditScore, fetchScore, loading } = useCreditScoreService(false);

  return <ScoringDetailsModule score={creditScore?.scoreValue} loading={loading} onPressUpdate={fetchScore} />;
};

export { ScoringDetailsScreen };
