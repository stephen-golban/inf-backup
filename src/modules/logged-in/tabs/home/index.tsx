import React from 'react';
import { Button } from 'react-native'; // Importăm butonul din React Native

import useHomeModule from './hooks';

import { Screen, View } from '@components/common';
import { CreditScore, CreditReport, InfoBox } from './parts';

import type { ICreditReportSummaryResponse, ICreditScoreResponse } from '@typings/responses';

interface IHomeModule {
  onPressCreditScore(data: ICreditScoreResponse): void;
  onPressCreditReport(data: ICreditReportSummaryResponse): void;
  infoBox: {
    onPressNewCredit(): void;
    onPressCreditReport(): void;
    onPressWhoCheckedCredit(): void;
  };
}

const HomeModule: React.FC<IHomeModule> = ({ onPressCreditReport, onPressCreditScore, infoBox }) => {
  const { refetch, report, fetchScore, score, scoreLoading } = useHomeModule();

  return (
    <Screen unsafe scroll bg="white" onRefresh={refetch} style={{ paddingHorizontal: 0, flex: 1, paddingBottom: 0 }}>
      <View row cg="md" px="md">
        <CreditScore fetchScore={fetchScore} data={score!} loading={scoreLoading} onPress={() => onPressCreditScore(score!)} />
        <CreditReport {...report} onPress={() => (report.data ? onPressCreditReport(report.data!) : null)} />
      </View>
      <InfoBox {...infoBox} />
    </Screen>
  );
};

export { HomeModule };
