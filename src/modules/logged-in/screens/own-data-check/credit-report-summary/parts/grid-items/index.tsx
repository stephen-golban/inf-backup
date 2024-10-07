import React from 'react';

import { Text, View } from '@components/common';
import { currencyFormat } from '@library/method';

import { PrimaryIndicators } from '@typings/responses';

interface IGridItems {
  data?: PrimaryIndicators;
}

const GridItems: React.FC<IGridItems> = ({ data }) => {
  return (
    <View row flexWrap="wrap" between center>
      <View bg="lightBlue" px="xs" center py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" color="blue" variant="16-mid">
          {data?.openedCommitments24}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:new_commitments" />
      </View>
      <View bg="lightBlue" px="xs" center py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" variant="16-mid" color="blue">
          {data?.closedCommitments24}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:closed_credits" />
      </View>
      <View bg="lightBlue" px="xs" center py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" variant="16-mid" color="crimsonRed">
          {data?.outstandingCommitments}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:outstanding_debts" />
      </View>
      <View bg="lightBlue" px="xs" center py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" variant="16-mid" color="blue">
          {data?.activeCommitmentsNr}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:updated_debts" />
      </View>
      <View bg="lightBlue" px="xs" center py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" variant="16-mid" color="blue">
          {currencyFormat(data?.totalDebtService || 0)}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:total_to_pay" />
      </View>
      <View bg="lightBlue" px="xs" py="xl" br={24} w="48%" mb="md">
        <Text textAlign="center" variant="16-mid" color="blue">
          {currencyFormat(data?.totalDebtService || 0)}
        </Text>
        <Text textAlign="center" mt="sm" variant="12-reg" color="gray" t18n="logged_in:credit_report:summary:total_without_penalties" />
      </View>
    </View>
  );
};

export { GridItems };
