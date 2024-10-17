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
  attribute: number;
}

const CommitmentItem: React.FC<ICommitmentItem> = props => {
  const { name, description, activityType, balance, qualityType, attribute } = props;

  const renderStatusLabel = () => {
    if (qualityType === 'POSITIVE') {
      return (
        <View bg="forestGreen" p="xs" br="xs">
          <Text color="white" variant="12-reg">
            OK
          </Text>
        </View>
      );
    }

    switch (attribute) {
      case 94:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              EX
            </Text>
          </View>
        );
      case 62:
        return (
          <View bg="skyBlue" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              AC
            </Text>
          </View>
        );
      case 71:
        return (
          <View bg="sunsetOrange" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              30
            </Text>
          </View>
        );
      case 78:
        return (
          <View bg="sunsetOrange" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              60
            </Text>
          </View>
        );
      case 80:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              90
            </Text>
          </View>
        );
      case 82:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              120
            </Text>
          </View>
        );
      case 83:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              180
            </Text>
          </View>
        );
      case 84:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              {'>180'}
            </Text>
          </View>
        );
      case 93:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              CE
            </Text>
          </View>
        );
      case 101:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              JD
            </Text>
          </View>
        );
      case 90:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              OF
            </Text>
          </View>
        );

      default:
        return (
          <View bg="crimsonRed" p="xs" br="xs">
            <Text color="white" variant="12-reg">
              IN
            </Text>
          </View>
        );
    }
  };

  return (
    <View bg="lightGray" px="md" py="lg" br={24}>
      <View row between center>
        {renderStatusLabel()}
        {name && (
          <View flex={1} mx="xs">
            <Text variant="12-reg">{name}</Text>
          </View>
        )}
        {activityType === 'ACTIVE' ? (
          <View align="flex-end">
            <Text variant="10-reg" t18n="logged_in:credit_report:summary:remaining_amount" />
            <Text variant="12-semi">{currencyFormat(balance)}</Text>
          </View>
        ) : (
          <View maxw={name ? '65%' : '100%'}>
            <Text variant="12-reg">{description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export { CommitmentItem };
