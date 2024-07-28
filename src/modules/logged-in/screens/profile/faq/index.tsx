import React from 'react';

import { ScrollView } from '@components/common';
import { CorrectionProcedure, CreditHistory, ExcludedInformations, FrequentlyQuestions } from './parts';

interface IFaqModule {
  onPressInfo(): void;
  onPressQuestions(): void;
  onPressProcedure(): void;
  onPressCreditHistory(): void;
}

const FaqModule: React.FC<IFaqModule> = props => {
  const { onPressInfo, onPressQuestions, onPressProcedure, onPressCreditHistory } = props;
  return (
    <ScrollView>
      <FrequentlyQuestions onPress={onPressQuestions} />
      <CreditHistory onPress={onPressCreditHistory} />
      <ExcludedInformations onPress={onPressInfo} />
      <CorrectionProcedure onPress={onPressProcedure} />
    </ScrollView>
  );
};

export { FaqModule };
