import React from 'react';
import { ScoringText } from './text';
import { ScoringOptions } from './options';

import { Scoring } from '@components/ui';
import { Screen } from '@components/common';

interface IScoringDetailsModuleProps {
  score?: number;
}

const ScoringDetailsModule: React.FC<IScoringDetailsModuleProps> = props => {
  const { score } = props;
  return (
    <Screen unsafe scroll px="zero">
      <Scoring rating={score || 0} />
      <ScoringText score={score || 0} />

      <ScoringOptions
        image={require('@assets/images/scoring/grown.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring_negative"
        color="crimsonRed"
        minValue={0}
        maxValue={550}
        value={20}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/fair.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring_neutral"
        color="goldenYellow"
        minValue={551}
        maxValue={600}
        value={60}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/lucky.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring_positive"
        color="limeGreen"
        minValue={601}
        maxValue={650}
        value={80}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/best.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring_excelent"
        color="forestGreen"
        minValue={651}
        maxValue={1000}
        value={100}
        hasDivider={false}
      />
    </Screen>
  );
};

export { ScoringDetailsModule };
