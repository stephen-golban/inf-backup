import React from 'react';
import { Text, View } from '@components/common';
import { currencyFormat } from '@library/method';

interface ICommitmentItem {
  name: string;
  type: string;
  status: string;
  balance: number;
  description: string;
  qualityType: string;
  activityType: string;
}

const CommitmentItem: React.FC<ICommitmentItem> = props => {
  const { name, description, activityType, balance, qualityType } = props;

  const renderStatusLabel = () => {
    if (activityType === 'CLOSED' && qualityType === 'POSITIVE') {
      return (
        <View bg="forestGreen" p="xs" br="xs">
          <Text color="white" variant="12-reg">
            OK
          </Text>
        </View>
      );
    } else if ((activityType === 'CLOSED' && qualityType === 'NEGATIVE') || activityType === 'CLOSED_WITH_BALANCE') {
      return (
        <View bg="crimsonRed" p="xs" br="xs">
          <Text color="white" variant="12-reg">
            EX
          </Text>
        </View>
      );
    } else if (activityType === 'ACTIVE' && qualityType === 'NEGATIVE') {
      return (
        <View bg="skyBlue" p="xs" br="xs">
          <Text color="white" variant="12-reg">
            AC
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View bg="lightGray" px="md" py="lg" br={24}>
      <View row between center>
        {renderStatusLabel()}
        <View flex={1} mx="xs">
          <Text variant="12-reg">{name}</Text>
        </View>
        {activityType === 'ACTIVE' ? (
          <View maxw="70%">
            <Text variant="12-reg">{description}</Text>
          </View>
        ) : (
          <View align="flex-end">
            <Text variant="10-reg" t18n="logged_in:credit_report_summary:remaining_amount" />
            <Text variant="12-semi">{currencyFormat(balance)}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export { CommitmentItem };
