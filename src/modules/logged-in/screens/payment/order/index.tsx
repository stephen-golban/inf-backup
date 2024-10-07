import React from 'react';

import { useAppStore } from '@store/app';

import { Divider } from '@components/ui';
import { FilledButton, Form, Screen, Text, View } from '@components/common';
import { CreditBureau, InternServiceType, LanguageSelect } from './parts';

import { CREDIT_BUREAU_MOCK, SERVICE_TYPE_MOCK } from './mock';
import { credit_report_order_form_schema, type CreditReportOrderFormFields } from './resolver';

interface IPaymentOrderModule {
  loading?: boolean;
  isReportOnly?: boolean;
  onPressDownload(): void;
  onPressNotNow(): void;
  onPressSend(email: string): void;
  onSubmit(input: CreditReportOrderFormFields): void;
}

const PaymentOrderModule: React.FC<IPaymentOrderModule> = ({
  onSubmit,
  onPressDownload,
  onPressSend,
  onPressNotNow,
  loading,
  isReportOnly,
}) => {
  const locale = useAppStore(state => state.locale);

  const defaultValues: CreditReportOrderFormFields = {
    language: locale,
    sendEmail: false,
    credit_bureau: CREDIT_BUREAU_MOCK[0].value,
    internServiceType: SERVICE_TYPE_MOCK[0].value,
    email: '',
  };

  return (
    <Screen unsafe scroll>
      {/* <CreditHistoryReport onPressNotNow={onPressNotNow} onPressDownload={onPressDownload} /> */}
      <Form resolver={credit_report_order_form_schema} defaultValues={defaultValues}>
        {({ control, handleSubmit, watch, formState }) => {
          return (
            <>
              <Text
                color="gray_66"
                mt="lg"
                textAlign="justify"
                variant="16-mid"
                t18n="logged_in:payment:credit_report_order:subscription_info"
              />
              {/* <EmailSelect control={control} canSendEmail={watch('sendEmail')} onSubmit={() => onPressSend(watch('email') || '')} /> */}
              {/* <View p="md" px="xs">
                <Text variant="24-bold" textAlign="center" t18n="logged_in:payment:credit_report_order:title" />

                <LanguageSelect control={control} />

                <CreditBureau control={control} />

                <InternServiceType control={control} isReportOnly={isReportOnly} />
              </View> */}

              <Divider isHorizontal my="lg" />

              <View p="md" fill between px="xs">
                <FilledButton
                  disabled={!formState.isValid}
                  bg="blue"
                  mt="xl"
                  onPress={handleSubmit(onSubmit)}
                  t18n="ui:continue"
                  loading={loading}
                />
              </View>
            </>
          );
        }}
      </Form>
    </Screen>
  );
};

export { PaymentOrderModule };
