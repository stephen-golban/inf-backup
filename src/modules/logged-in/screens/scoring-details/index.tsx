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
        title="logged_in:home:own_data_check:credit_scoring:scoring:grown"
        color="crimsonRed"
        minValue={0}
        maxValue={600}
        value={20}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/grown.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring:medium"
        color="tangerineOrange"
        maxValue={601}
        minValue={650}
        value={40}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/fair.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring:fair"
        color="goldenYellow"
        maxValue={651}
        minValue={700}
        value={60}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/lucky.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring:lucky"
        color="limeGreen"
        maxValue={701}
        minValue={750}
        value={80}
      />
      <ScoringOptions
        image={require('@assets/images/scoring/best.png')}
        title="logged_in:home:own_data_check:credit_scoring:scoring:best"
        color="forestGreen"
        maxValue={751}
        minValue={1000}
        value={100}
        hasDivider={false}
      />
    </Screen>
  );
};

export { ScoringDetailsModule };
