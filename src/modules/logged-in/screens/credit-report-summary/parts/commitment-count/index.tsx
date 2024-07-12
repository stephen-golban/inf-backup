import React from 'react';
import { Divider } from '@components/ui/divider';
import { FilledButton, Text, View } from '@components/common';

interface ICommitmentCount {
  activePositiveCommitments?: number;
  activeNegativeCommitments?: number;

  onOrderReport(): void;
}

const CommitmentCount: React.FC<ICommitmentCount> = props => {
  const { activePositiveCommitments, activeNegativeCommitments, onOrderReport } = props;
  return (
    <View>
      <View bg="lightGray" px="md" py="sm" shadow="card" row center>
        <Text color="forestGreen" variant="12-reg">
          {`${activePositiveCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report_summary:active_commitments_with" />
        <Text> </Text>
        <Text color="forestGreen" variant="12-reg" t18n="logged_in:credit_report_summary:positive_history" />
      </View>
      <View bg="lightGray" px="md" py="sm" shadow="card" row center>
        <Text color="forestGreen" variant="12-reg">
          {`${activeNegativeCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report_summary:active_commitments_with" />
        <Text> </Text>
        <Text color="crimsonRed" variant="12-reg" t18n="logged_in:credit_report_summary:negative_history" />
      </View>
      <Divider isHorizontal />
      <View my="lg" px="xxl">
        <FilledButton
          onPress={onOrderReport}
          textProps={{ variant: '14-reg' }}
          br="sm"
          t18n="logged_in:credit_report_summary:order_report_for_details"
        />
      </View>
    </View>
  );
};

export { CommitmentCount };
