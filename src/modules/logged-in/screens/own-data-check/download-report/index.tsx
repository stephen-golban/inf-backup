import React from 'react';

import { Screen, Text } from '@components/common';
import { Email, History, Order } from './parts';

interface IDownloadReportModule {
  reportId: number;
  onPressNotNow(): void;
  generationDateTime: string;
}

const DownloadReportModule: React.FC<IDownloadReportModule> = ({ reportId, generationDateTime, onPressNotNow }) => {
  return (
    <Screen excludeEdges={['top']} scroll bg="white">
      <History reportId={reportId} onPressNotNow={onPressNotNow} />
      <Text color="gray_66" mt="lg" textAlign="justify" variant="16-mid" t18n="logged_in:credit_report:download:subscription_info" />
      <Email reportId={reportId} />
      <Order generationDateTime={generationDateTime} />
    </Screen>
  );
};

export { DownloadReportModule };
