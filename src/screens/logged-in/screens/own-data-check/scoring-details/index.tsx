import React from 'react';

import { useCreditScoreService } from '@services/credit-score';

import { ScoringDetailsModule } from '@modules/logged-in';

import { OWN_DATA_CHECK_SCREENS, OwnDataCheckScreenProps } from '@typings/navigation';
import { useAppStore } from '@store/app';

const ScoringDetailsScreen: React.FC<OwnDataCheckScreenProps<OWN_DATA_CHECK_SCREENS.ScoringDetails>> = ({ navigation }) => {
  const { creditScore, fetchScore, loading } = useCreditScoreService(false, navigation);
  const subscription = useAppStore(state => state.subscription);

  return (
    <ScoringDetailsModule
      navigation={navigation}
      subscription={subscription}
      score={creditScore?.scoreValue}
      loading={loading}
      onPressUpdate={fetchScore}
    />
  );
};

export { ScoringDetailsScreen };
