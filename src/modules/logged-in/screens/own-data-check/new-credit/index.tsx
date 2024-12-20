import React from 'react';

import LoanForm from './loan-form';
import { Trans } from 'react-i18next';
import FastImage from '@d11/react-native-fast-image';
import { FilledButton, Icon, Screen, Text } from '@components/common';

import type { I18nKey } from '@translations/locales';
import type { LoanFormFields } from './loan-form/resolver';

interface INewCreditModule {
  loading: boolean;
  loanFormLoading: boolean;
  onRefresh?(): void;
  isPositive: boolean;
  onPressDownload(): void;
  isSubscriptionValid: boolean;
  isTrialSubscription?: boolean;
  onSubmitLoan(args: LoanFormFields): void;
  // data: CreditReportQualityApiResponse | undefined;
}

const NewCreditModule: React.FC<INewCreditModule> = ({
  loading,
  isPositive,
  loanFormLoading,
  isSubscriptionValid,
  isTrialSubscription,
  onRefresh,
  onSubmitLoan,
  onPressDownload,
}) => {
  return (
    <Screen excludeEdges={['top']} scroll loading={loading} onRefresh={onRefresh} style={{ paddingHorizontal: 20 }}>
      <Text
        variant="24-bold"
        textAlign="center"
        fontWeight="400"
        fontSize={32}
        mt="xl"
        t18n={`logged_in:credit_report:new:${isPositive ? 'success' : 'fail'}.title` as I18nKey}
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
        t18n={`logged_in:credit_report:new.${isPositive ? 'success' : 'fail'}.message` as I18nKey}
      />

      <FilledButton
        bg="blue"
        br={6}
        mt="xxl"
        onPress={onPressDownload}
        textProps={{ variant: '14-reg' }}
        t18n={`logged_in:credit_report:new:button${isSubscriptionValid && !isTrialSubscription ? '_positive' : '_negative'}`}
      />

      {isPositive && (
        <>
          <LoanForm onSubmit={onSubmitLoan} loading={loanFormLoading} />

          <FilledButton br={12} bg="softGray" mt="xl">
            <Icon icon="ShieldSuccessIcon" />
            <Text variant="12-mid" color="gray_50" t18n="logged_in:credit_report:new:success:data_protection" />
          </FilledButton>

          <Text mt="lg" variant="12-mid" textAlign="justify">
            <Trans
              i18nKey="logged_in:credit_report:new:success:disclaimer"
              components={{
                1: <Text color="sunsetOrange" />,
                2: <Text color="black" />,
              }}
            />
          </Text>
        </>
      )}
    </Screen>
  );
};

export { NewCreditModule };
