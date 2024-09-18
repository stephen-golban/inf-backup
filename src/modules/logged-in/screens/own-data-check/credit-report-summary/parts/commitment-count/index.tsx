import React from 'react';
import { Divider } from '@components/ui/divider';
import { Avatar, FilledButton, Icon, Text, View } from '@components/common';

interface ICommitmentCount {
  refreshing?: boolean;
  canOrderReport?: boolean;
  activePositiveCommitments?: number;
  activeNegativeCommitments?: number;

  onRefresh(): void;
  onOrderReport(): void;
}

const CommitmentCount: React.FC<ICommitmentCount> = props => {
  const { activePositiveCommitments, activeNegativeCommitments, canOrderReport, refreshing, onOrderReport, onRefresh } = props;
  return (
    <View bg="white">
      <Divider isHorizontal />
      <View px="md" py="sm" row center>
        <Text color="forestGreen" variant="12-reg">
          {`${activePositiveCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report_summary:active_commitments_with" />
        <Text> </Text>
        <Text color="forestGreen" variant="12-reg" t18n="logged_in:credit_report_summary:positive_history" />
      </View>
      <Divider isHorizontal />
      <View px="md" py="sm" row center>
        <Text color="forestGreen" variant="12-reg">
          {`${activeNegativeCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report_summary:active_commitments_with" />
        <Text> </Text>
        <Text color="crimsonRed" variant="12-reg" t18n="logged_in:credit_report_summary:negative_history" />
      </View>
      <Divider isHorizontal />
      <View my="lg" px="lg" row cg="sm">
        <FilledButton
          br="sm"
          fill
          onPress={onOrderReport}
          disabled={!canOrderReport}
          textProps={{ variant: '14-reg' }}
          t18n="logged_in:credit_report_summary:order_report_for_details"
        />
        <Avatar.Base br="sm" center size={48} bg="blue" onPress={onRefresh}>
          <Icon icon="RefreshIcon" size={24} color="white" disabled loading={refreshing} />
        </Avatar.Base>
      </View>
    </View>
  );
};

export { CommitmentCount };
