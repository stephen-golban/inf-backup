import React from 'react';

import FastImage from 'react-native-fast-image';
import { BaseButton, OutlinedButton, Screen, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';
import type { CreditReportQualityApiResponse } from '@typings/responses';

interface INewCreditModule {
  onRefresh?(): void;
  updateReport?(): void;
  inquiryLoading: boolean;
  updateLoading: boolean;
  data: CreditReportQualityApiResponse | null;
}

const NewCreditModule: React.FC<INewCreditModule> = ({ data, onRefresh, inquiryLoading, updateLoading, updateReport }) => {
  const isPositive = data?.creditReportQualityType === 'POSITIVE';

  return (
    <Screen unsafe pt="zero" loading={inquiryLoading} onRefresh={onRefresh}>
      <View px="md" align="center" fill pt="xl">
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
          style={{ width: 203, height: 103, marginTop: 20 }}
          source={isPositive ? require('@assets/images/check-success.png') : require('@assets/images/x-fail.png')}
        />

        <Text
          mt="lg"
          fontWeight="400"
          variant="16-semi"
          textAlign="center"
          t18n={`logged_in:home:own_data_check.new_credit.${isPositive ? 'success' : 'fail'}.message` as I18nKey}
        />

        <OutlinedButton mt="lg" onPress={updateReport} w={200} minh={40} loading={updateLoading} t18n="ui:update_data" />
        <BaseButton bg="blue" br={12} mt="md" w="100%" maxw={270} h={45} justify="center">
          <Text color="white" textAlign="center" t18n="logged_in:home:own_data_check:new_credit:button" />
        </BaseButton>
      </View>
    </Screen>
  );
};

export { NewCreditModule };
