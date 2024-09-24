import React from 'react';
import { StyleSheet } from 'react-native';

import useHomeModule from '../../hooks';

import { Loader } from '@components/ui';
import { BaseButton, Icon, Text, View } from '@components/common';

type Report = ReturnType<typeof useHomeModule>['report'];

interface ICreditReport extends Report {
  onPress(): void;
}

const CreditReport: React.FC<ICreditReport> = ({ badgeCount, data, formattedCount, loading, refetch, onPress }) => {
  return (
    <BaseButton onPress={onPress} fill bg="lightGray" br="xl" shadow="card" h={data ? 170 : 120}>
      {loading ? (
        <Loader />
      ) : !data ? (
        <View p="lg" px="md" rg="md" w="100%" h="100%">
          <BaseButton onPress={refetch} fill br="md" center>
            <Text
              textAlign="center"
              color="blue"
              textDecorationLine="underline"
              t18n="logged_in:home:check_credit_report"
              variant="16-semi"
            />
          </BaseButton>
        </View>
      ) : (
        <View p="lg" px="md" rg="md">
          <Text t18n="logged_in:home:active_debt_amount" variant="12-reg" />
          <Text mt="sm" color="blue" variant="18-semi" text={formattedCount} />

          <View>
            <View h={StyleSheet.hairlineWidth} bg="gray_c8" />
            <View row between align="center" mt="md">
              <Text t18n="logged_in:home:obligations_history" flex />
              <Icon icon="ChevronRight" size={12} ml="sm" />
              {(badgeCount || 0) > 0 && (
                <Icon icon="BadgeIcon" iconProps={{ number: badgeCount }} size={20} absolute top={-10} right={10} />
              )}
            </View>
          </View>
        </View>
      )}
    </BaseButton>
  );
};

export { CreditReport };
