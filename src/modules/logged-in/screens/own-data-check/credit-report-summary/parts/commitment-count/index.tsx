import React from 'react';
import { HistoryCard } from '@components/ui';
import { Divider } from '@components/ui/divider';
import { FilledButton, Text, View } from '@components/common';
import { I18nKey } from '@translations/locales';

interface ICommitmentCount {
  refreshing?: boolean;
  buttonTitle?: I18nKey;
  canOrderReport?: boolean;
  activePositiveCommitments?: number;
  activeNegativeCommitments?: number;
  inquiryDateTime?: Date | string | undefined;
  lastEventDateTime?: Date | string | undefined;

  onRefresh(): void;
  onOrderReport(): void;
}

const CommitmentCount: React.FC<ICommitmentCount> = props => {
  const {
    buttonTitle,
    onOrderReport,
    canOrderReport,
    inquiryDateTime,
    lastEventDateTime,
    activePositiveCommitments,
    activeNegativeCommitments,
  } = props;
  return (
    <View bg="white">
      <Divider isHorizontal />
      <View px="md" py="sm" row center>
        <Text color="forestGreen" variant="12-reg">
          {`${activePositiveCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report:summary:active_commitments_with" />
        <Text> </Text>
        <Text color="forestGreen" variant="12-reg" t18n="logged_in:credit_report:summary:positive_history" />
      </View>
      <Divider isHorizontal />
      <View px="md" py="sm" row center>
        <Text color="crimsonRed" variant="12-reg">
          {`${activeNegativeCommitments} `}
        </Text>
        <Text variant="12-reg" t18n="logged_in:credit_report:summary:active_commitments_with" />
        <Text> </Text>
        <Text color="crimsonRed" variant="12-reg" t18n="logged_in:credit_report:summary:negative_history" />
      </View>
      <Divider isHorizontal />
      <View p="sm">
        <HistoryCard t18nTitle="logged_in:home:info:last_interogation" date={inquiryDateTime} />
        <HistoryCard t18nTitle="logged_in:credit_report:last_credit_history_update" date={lastEventDateTime} />
      </View>
      <View mb="lg" px="lg" row cg="sm">
        <FilledButton
          br="sm"
          fill
          onPress={onOrderReport}
          disabled={!canOrderReport}
          textProps={{ variant: '14-reg' }}
          t18n={buttonTitle}
        />
      </View>
    </View>
  );
};

export { CommitmentCount };
