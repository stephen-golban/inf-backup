import React from 'react';

import LoanForm from './loan-form';
import FastImage from '@d11/react-native-fast-image';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';
import type { CreditReportQualityApiResponse } from '@typings/responses';
import { Trans } from 'react-i18next';

interface INewCreditModule {
  loading: boolean;
  onRefresh?(): void;
  data: CreditReportQualityApiResponse | undefined;
}

const NewCreditModule: React.FC<INewCreditModule> = ({ data, onRefresh, loading }) => {
  const isPositive = data?.creditReportQualityType === 'POSITIVE';

  return (
    <Screen excludeEdges={['top']} scroll loading={loading} onRefresh={onRefresh} style={{ paddingHorizontal: 20 }}>
      <Text
        variant="24-bold"
        textAlign="center"
        fontWeight="400"
        fontSize={32}
        mt="xl"
        t18n={`logged_in:home:own_data_check:new_credit:${isPositive ? 'success' : 'fail'}.title` as I18nKey}
      />
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        style={{ width: 203, height: 103, marginTop: 20, alignSelf: 'center' }}
        source={isPositive ? require('@assets/images/check-success.png') : require('@assets/images/x-fail.png')}
      />

      <Text
        mt="lg"
        fontWeight="400"
        variant="16-semi"
        textAlign="center"
        t18n={`logged_in:home:own_data_check.new_credit.${isPositive ? 'success' : 'fail'}.message` as I18nKey}
      />

      <FilledButton bg="blue" br={6} mt="xxl" textProps={{ variant: '14-reg' }} t18n="logged_in:home:own_data_check:new_credit:button" />

      <LoanForm onSubmit={console.log} />

      <FilledButton br={12} bg="softGray" mt="xl">
        <Icon icon="ShieldSuccessIcon" />
        <Text variant="12-mid" color="gray_50" t18n="logged_in:home:own_data_check:new_credit:success:data_protection" />
      </FilledButton>

      <Text mt="lg" variant="12-mid" textAlign="justify">
        <Trans
          i18nKey="logged_in:home:own_data_check:new_credit:success:disclaimer"
          components={{
            1: <Text color="sunsetOrange" />,
            2: <Text color="black" />,
          }}
        />
      </Text>
    </Screen>
  );
};

export { NewCreditModule };
