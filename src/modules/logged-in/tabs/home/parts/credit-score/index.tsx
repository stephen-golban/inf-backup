import React from 'react';
import { StyleSheet } from 'react-native';

import { Loader } from '@components/ui';
import { BaseButton, Icon, Image, Text, View } from '@components/common';

import type { ICreditScoreResponse } from '@typings/responses';

interface ICreditScore {
  onPress(): void;
  loading?: boolean;
  data: ICreditScoreResponse | undefined;
}

const CreditScore: React.FC<ICreditScore> = ({ data, loading, onPress }) => {
  return (
    <BaseButton onPress={onPress} fill bg="lightGray" br="xl" shadow="card" h={180}>
      {loading ? (
        <Loader />
      ) : !data ? (
        <View p="lg" px="md" rg="sm" w="100%" h="100%">
          <Image source={require('@assets/images/x-fail.png')} />
        </View>
      ) : (
        <View p="lg" px="md" rg="sm">
          <Text t18n="logged_in:home:your_credit_score" variant="12-reg" />
          <Text mt="sm" color="error" variant="32-semi" text={(data?.scoreValue || 0).toString()} />

          <View>
            <View h={StyleSheet.hairlineWidth} bg="gray_c8" />
            <View row between align="center" mt="md">
              <Text t18n="logged_in:home:your_scoring_details" flex />
              <Icon icon="ChevronRight" size={12} ml="sm" />
            </View>
          </View>
        </View>
      )}
    </BaseButton>
  );
};

export { CreditScore };
