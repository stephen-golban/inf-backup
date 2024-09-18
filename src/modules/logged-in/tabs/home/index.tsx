import React from 'react';

import { Screen, View } from '@components/common';
import { CreditScore, CreditReport, InfoBox } from './parts';

interface IHomeModule {
  loading?: boolean;
  onPressNewCredit(): void;
  onRefresh(): Promise<void>;
  onPressCreditScore(): void;
  onPressCreditReport(): void;
  onPressWhoCheckedCredit(): void;
}

const HomeModule: React.FC<IHomeModule> = ({
  loading,
  onRefresh,
  onPressNewCredit,
  onPressCreditScore,
  onPressCreditReport,
  onPressWhoCheckedCredit,
}) => {
  return (
    <Screen unsafe scroll bg="white" onRefresh={onRefresh} style={{ paddingHorizontal: 0, paddingBottom: 0 }} loading={loading}>
      <View row cg="md" px="md">
        <CreditScore onPress={onPressCreditScore} />
        <CreditReport onPress={onPressCreditReport} />
      </View>
      <InfoBox
        fetchReport={onRefresh}
        onPressNewCredit={onPressNewCredit}
        onPressCreditReport={onPressCreditReport}
        onPressWhoCheckedCredit={onPressWhoCheckedCredit}
      />
    </Screen>
  );
};

export { HomeModule };
