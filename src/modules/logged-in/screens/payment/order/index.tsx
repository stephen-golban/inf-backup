import React from 'react';

import { useAppStore } from '@store/app';
import { Controller } from 'react-hook-form';

import { Divider } from '@components/ui';
import { LanguageSelect } from './parts';
import { Checkbox, Dropdown, FilledButton, Form, Screen, Text, View } from '@components/common';

import { CREDIT_BUREAU_MOCK, SERVICE_TYPE_MOCK } from './mock';
import { credit_report_order_form_schema, type CreditReportOrderFormFields } from './resolver';

import type { Locale } from '@typings/app';

interface IPaymentOrderModule {
  loading?: boolean;
  onSubmit(input: CreditReportOrderFormFields): void;
}

const PaymentOrderModule: React.FC<IPaymentOrderModule> = ({ onSubmit, loading }) => {
  const { user, locale } = useAppStore(state => state);
  const emails = user?.contactData.filter(item => item.type === 'EMAIL').map(item => item.value);

  const defaultValues: CreditReportOrderFormFields = {
    language: locale,
    sendEmail: true,
    internServiceType: SERVICE_TYPE_MOCK[0].value,
    credit_bureau: CREDIT_BUREAU_MOCK[0].value,
  };

  return (
    <Screen unsafe scroll>
      <Form resolver={credit_report_order_form_schema} defaultValues={defaultValues}>
        {({ control, handleSubmit }) => {
          return (
            <>
              <View p="md">
                <Text variant="24-bold" textAlign="center" mt="xl" t18n="logged_in:credit_report_summary:credit_report_order:title" />

                <View mt="lg">
                  <Text ml="sm" variant="16-semi" t18n="logged_in:credit_report_summary:credit_report_order:select_language" />
                  <View mt="sm">
                    <Controller
                      control={control}
                      name="language"
                      render={({ field }) => {
                        return <LanguageSelect onSelectLanguage={field.onChange} value={field.value as Locale} />;
                      }}
                    />
                  </View>
                </View>
                <View mt="lg">
                  <Text ml="sm" variant="16-semi" t18n="logged_in:credit_report_summary:credit_report_order:choose_credit_bureau" />
                  <View mt="sm">
                    <Controller
                      control={control}
                      name="credit_bureau"
                      render={({ field }) => {
                        const defaultValue = CREDIT_BUREAU_MOCK.find(item => item.value === field.value);
                        return (
                          <Dropdown
                            bg="softGray"
                            data={CREDIT_BUREAU_MOCK}
                            defaultValue={defaultValue}
                            onChange={arg => field.onChange(arg.value)}
                          />
                        );
                      }}
                    />
                  </View>
                </View>

                <View mt="lg">
                  <Text ml="sm" variant="16-semi" t18n="logged_in:credit_report_summary:credit_report_order:choose_service_type" />
                  <View mt="sm">
                    <Controller
                      control={control}
                      name="internServiceType"
                      render={({ field }) => {
                        const defaultValue = SERVICE_TYPE_MOCK.find(item => item.value === field.value);
                        return (
                          <Dropdown
                            bg="lightBlue"
                            data={SERVICE_TYPE_MOCK}
                            defaultValue={defaultValue}
                            onChange={arg => field.onChange(arg.value)}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
              </View>

              <Divider isHorizontal my="lg" />

              <View p="md" fill between>
                <View>
                  <Controller
                    control={control}
                    name="sendEmail"
                    render={({ field }) => {
                      return (
                        <Checkbox size={20} checkIconSize={14} reverse onToggle={option => field.onChange(option)} value={field.value}>
                          <Text flex variant="14-semi" t18n="logged_in:credit_report_summary:credit_report_order:email_copy" />
                        </Checkbox>
                      );
                    }}
                  />
                  <View rg="sm" mt="lg">
                    {emails?.map((item, idx) => {
                      return (
                        <View key={item + idx} bg="softGray" py="sm" px="xs">
                          <Text variant="14-reg">{item}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <FilledButton bg="blue" mt="xl" onPress={handleSubmit(onSubmit)} t18n="ui:continue" loading={loading} />
              </View>
            </>
          );
        }}
      </Form>
    </Screen>
  );
};

export { PaymentOrderModule };
