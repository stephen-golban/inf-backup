import React from 'react';

import { useAppStore } from '@store/app';

import { Paper } from '@components/ui';
import { Email, History, Order } from './parts';
import { FilledButton, Screen, Text } from '@components/common';

interface IDownloadReportModule {
  reportId: number;
  loading: boolean;
  onPressNotNow(): void;
  onPressChooseSubscription(): void;
  generationDateTime: string;
}

const DownloadReportModule: React.FC<IDownloadReportModule> = ({
  reportId,
  loading,
  generationDateTime,
  onPressNotNow,
  onPressChooseSubscription,
}) => {
  const sub = useAppStore(state => state.subscription);
  const isTrial = sub?.trial === true;

  return (
    <Screen excludeEdges={['top']} scroll bg="white" loading={loading}>
      <History reportId={reportId} onPressNotNow={onPressNotNow} onPressChooseSubscription={onPressChooseSubscription} />
      <Text color="gray_66" mt="lg" textAlign="justify" variant="14-mid" t18n="logged_in:credit_report:download:subscription_info" />
      {isTrial ? (
        <FilledButton
          br={8}
          bg="blue"
          mt="lg"
          textProps={{ variant: '14-mid' }}

          onPress={onPressChooseSubscription}
          t18n="logged_in:credit_report:download:history:choose_subscription"
        />
      ) : (
        <Email reportId={reportId} />
      )}
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
