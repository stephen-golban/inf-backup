import React from 'react';

import { useCreateCreditReportService } from '@services/use-create-credit-report';

import { Paper } from '@components/ui';
import { FilledButton, Icon, Text, View } from '@components/common';

interface IHistory {
  reportId: number;
  onPressNotNow(): void;
}

const History: React.FC<IHistory> = ({ reportId, onPressNotNow }) => {
  const { createPDF, loading } = useCreateCreditReportService();
  const onPressDownload = () => createPDF(reportId);

  return (
    <Paper br={12} shadow="card" p="lg" center bg="lightBlue" py="xl" mt="xxhuge">
      <Icon icon="ReportImageIcon" absolute top={-130} left="45%" style={{ transform: [{ translateX: '-60%' }] }} />
      <Text variant="16-bold" color="blue" t18n="logged_in:credit_report:download:history:title" />
      <Text variant="12-reg" mt="sm" color="black" t18n="logged_in:credit_report:download:history:subtitle" />
      <View row between mt="lg" align="center" cg="md">
        <FilledButton
          h={32}
          br={12}
          w={130}
          bg="blue"
          loading={loading}
          t18n="ui:download"
          onPress={onPressDownload}
          textProps={{ variant: '12-mid' }}
        />
        <FilledButton
          h={32}
          w={130}
          t18n="ui:not_now"
          bg="transparent"
          bc="transparent"
          textColor="gray_7e"
          onPress={onPressNotNow}
          textProps={{ variant: '12-mid' }}
        />
      </View>
    </Paper>
  );
};

export default History;
