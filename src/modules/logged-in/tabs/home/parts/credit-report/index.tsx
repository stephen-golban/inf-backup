import React from 'react';
import { StyleSheet } from 'react-native';

import { useCreditReportSummaryService } from '@services/credit-report-summary';

import { Loader } from '@components/ui';
import { BaseButton, Icon, Text, View } from '@components/common';

interface ICreditReport {
  onPress(): void;
}

const CreditReport: React.FC<ICreditReport> = ({ onPress }) => {
  const { fetchCreditReport, formattedCount, badgeCount, loading, creditReportSummary } = useCreditReportSummaryService();

  const content = React.useMemo(() => {
    if (loading) {
      return <Loader />;
    }

    if (!creditReportSummary) {
      return (
        <View p="lg" px="md" rg="md" w="100%" h="100%" center>
          <Text
            textAlign="center"
            color="blue"
            onPress={fetchCreditReport}
            textDecorationLine="underline"
            t18n="logged_in:home:check_credit_report"
            variant="16-semi"
          />
        </View>
      );
    }

    return (
      <View p="lg" px="md" rg="md">
        <Text t18n="logged_in:home:active_debt_amount" variant="12-reg" />
        <Text mt="sm" color="blue" variant="18-semi" text={formattedCount} />

        <View>
          <View h={StyleSheet.hairlineWidth} bg="gray_c8" />
          <View row between align="center" mt="md">
            <Text t18n="logged_in:home:obligations_history" flex />
            <Icon icon="ChevronRight" size={12} ml="sm" />
            {badgeCount > 0 && <Icon icon="BadgeIcon" iconProps={{ number: badgeCount }} size={20} absolute top={-10} right={10} />}
          </View>
        </View>
      </View>
    );
  }, [creditReportSummary, loading, formattedCount, badgeCount, fetchCreditReport]);

  return (
    <BaseButton onPress={onPress} fill bg="lightGray" br="xl" shadow="card" h={180}>
      {content}
    </BaseButton>
  );
};

export { CreditReport };
