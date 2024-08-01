import React from 'react';

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

  const maxUpdateDate = Object.values(report?.data?.creditReport.commitments || [])
    .filter(commitments => commitments.length > 0)
    .flat()
    .reduce<string | null>(
      (maxDate, { updateDate }) => (!maxDate || new Date(updateDate) > new Date(maxDate) ? updateDate : maxDate),
      null,
    );

  return (
    <Screen unsafe scroll bg="white" onRefresh={refetch} style={{ paddingHorizontal: 0, paddingBottom: 0 }}>
      <View row cg="md" px="md">
        <CreditScore
          fetchScore={fetchScore}
          data={score!}
          loading={scoreLoading}
          onPress={() => (score ? onPressCreditScore(score!) : null)}
        />
        <CreditReport {...report} onPress={() => (report.data ? onPressCreditReport(report.data!) : null)} />
      </View>
      <InfoBox
        loading={report.loading}
        fetchReport={report.refetch}
        maxUpdateDate={maxUpdateDate!}
        subjectDate={report.data?.creditReport.subjectUpdateDate!}
        {...infoBox}
      />
    </Screen>
  );
};

export { HomeModule };
