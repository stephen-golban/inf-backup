import React from 'react';
import { StyleSheet } from 'react-native';

import { useCreditScoreService } from '@services/credit-score';

import { Loader } from '@components/ui';
import { BaseButton, Icon, Text, View } from '@components/common';

interface ICreditScore {
  onPress(): void;
}

const CreditScore: React.FC<ICreditScore> = ({ onPress }) => {
  const { fetchScore, loading, creditScore } = useCreditScoreService();

  const content = React.useMemo(() => {
    if (loading) {
      return <Loader />;
    }

    if (!creditScore) {
      return (
        <View p="lg" px="md" rg="sm" w="100%" h="100%" center>
          <Text
            textAlign="center"
            color="blue"
            onPress={fetchScore}
            textDecorationLine="underline"
            t18n="logged_in:home:check_your_credit_score"
            variant="16-semi"
          />
        </View>
      );
    }

    return (
      <View p="lg" px="md" rg="sm">
        <Text t18n="logged_in:home:your_credit_score" variant="12-reg" />
        <Text mt="sm" color="error" variant="32-semi" text={creditScore.scoreValue?.toString() || '0'} />

        <View>
          <View h={StyleSheet.hairlineWidth} bg="gray_c8" />
          <View row between align="center" mt="md">
            <Text t18n="logged_in:home:your_scoring_details" flex />
            <Icon icon="ChevronRight" size={12} ml="sm" />
          </View>
        </View>
      </View>
    );
  }, [creditScore, loading]);

  return (
    <BaseButton onPress={onPress} fill bg="lightGray" br="xl" shadow="card" h={180}>
      {content}
    </BaseButton>
  );
};

export { CreditScore };
