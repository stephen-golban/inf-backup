import React from 'react';

import { useFaq } from './hooks';

import { ScrollView } from '@components/common';
import { CorrectionProcedure, CreditHistory, ExcludedInformations, FrequentlyQuestions } from './parts';
import { Loader } from '@components/ui';

interface IFaqModule {
  onPressInfo(): void;
  onPressQuestions(): void;
  onPressProcedure(): void;
  onPressCreditHistory(): void;
}

const FaqModule: React.FC<IFaqModule> = props => {
  const { onPressInfo, onPressQuestions, onPressProcedure, onPressCreditHistory } = props;

  const { faq, loading } = useFaq();

  if (loading) {
    return <Loader center />;
  }

  console.log('faq', JSON.stringify(faq));

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
