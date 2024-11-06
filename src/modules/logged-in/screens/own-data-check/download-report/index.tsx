import React from 'react';

import { Paper } from '@components/ui';
import { Email, History, Order } from './parts';
import { Screen, Text } from '@components/common';

interface IDownloadReportModule {
  reportId: number;
  loading: boolean;
  onPressNotNow(): void;
  generationDateTime: string;
}

const DownloadReportModule: React.FC<IDownloadReportModule> = ({ reportId, loading, generationDateTime, onPressNotNow }) => {
  return (
    <Screen excludeEdges={['top']} scroll bg="white" loading={loading}>
      <History reportId={reportId} onPressNotNow={onPressNotNow} />
      <Text color="gray_66" mt="lg" textAlign="justify" variant="16-mid" t18n="logged_in:credit_report:download:subscription_info" />
      <Email reportId={reportId} />
      <Order />
      <Text color="gray" variant="14-mid" mt="lg" t18n="logged_in:credit_report:download:order:confirmation" />
      <Paper shadow="card" bg="lightBlue" br={12} rg="md" p="md" mt="lg">
        <Text
          color="gray"
          variant="14-mid"
          t18n="logged_in:credit_report:download:order:generated_on"
          t18nOptions={{ date: generationDateTime }}
        />
      </Paper>
    </Screen>
  );
};

export { DownloadReportModule };
