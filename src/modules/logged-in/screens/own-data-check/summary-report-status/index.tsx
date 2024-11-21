import React from 'react';
import { Paper } from '@components/ui';
import { FilledButton, Icon, Screen, Text } from '@components/common';

interface ISummaryReportStatusProps {
  status: string;
  onPress: () => void;
}

const SummaryReportStatusModule: React.FC<ISummaryReportStatusProps> = ({ status, onPress }) => {
  return (
    <Screen pt="zero" scroll unsafe>
      <Paper bg="lightBlue" br="xl" shadow="card" py="xl">
        <Text variant="16-reg" center t18n="ui:summary_report_request" />
      </Paper>
      {status === 'accepted' ? (
        <Text center my="md" color="teal" variant="24-mid" t18n="ui:transaction_accepted" />
      ) : (
        <Text center my="md" color="crimsonRed" variant="24-mid" t18n="ui:transaction_rejected" />
      )}
      {status === 'accepted' ? <Icon center icon="AcceptedTransactionIcon" /> : <Icon center icon="RejectedTransactionIcon" />}
      {status === 'accepted' ? (
        <Text color="black_60" center my="md" lineHeight={20} t18n="ui:pdf_report_download" />
      ) : (
        <Text color="black_60" center my="md" lineHeight={20} t18n="ui:insufficient_funds" />
      )}
      <FilledButton mt="lg" onPress={onPress} text="OK" />
    </Screen>
  );
};

export { SummaryReportStatusModule };
