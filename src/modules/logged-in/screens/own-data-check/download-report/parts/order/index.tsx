import React from 'react';

import { useMe } from '@services/me';
import useDownloadReportOrder from './hooks';
import { useTranslation } from '@library/hooks';

import { SwitchRow } from './parts';
import { Paper } from '@components/ui';
import { Controller } from 'react-hook-form';
import { PhoneOrEmailModule } from '@modules/modals';
import { Checkbox, FilledButton, Form, Icon, Select, Text, View } from '@components/common';

import type { Option } from '@rn-primitives/select';
import { type ReportRequestFormFields, report_request_schema } from './resolver';

const defaultValues = {
  phone: undefined,
  termsAgreement: false,
  originalStampedReport: false,
  originalTranslatedReport: false,
  translatedApostilledReport: false,
};

const Order: React.FC = () => {
  const { t } = useTranslation();
  const { getMe, loading: loadingMe } = useMe();
  const { generatedPhones, loading, onSubmit } = useDownloadReportOrder();

  return (
    <Form resolver={report_request_schema} defaultValues={defaultValues as any}>
      {({ control, reset, handleSubmit, formState: { isValid }, getValues }) => {
        const onSubmitWithReset = (data: ReportRequestFormFields) => {
          onSubmit(data);
          reset();
        };
        return (
          <View mt="xxxl">
            <Icon icon="EnvelopeImageIcon" alignSelf="center" />
            <Text variant="16-bold" color="blue" textAlign="center" mt="xl" t18n="logged_in:credit_report:download:order:question" />
            <Paper shadow="card" bg="lightGray" br={12} rg="md" py="xl" px="lg" mt="lg">
              <Controller
                control={control}
                name="originalStampedReport"
                render={({ field }) => <SwitchRow value={field.value} onChange={field.onChange} keyword="stamped" icon="PostAddIcon" />}
              />
              <Controller
                control={control}
                name="translatedApostilledReport"
                render={({ field }) => <SwitchRow value={field.value} onChange={field.onChange} keyword="translated" icon="ApprovalIcon" />}
              />
              <Controller
                control={control}
                name="originalTranslatedReport"
                render={({ field }) => (
                  <SwitchRow value={field.value} onChange={field.onChange} keyword="translated_original" icon="USPSIcon" />
                )}
              />
            </Paper>
            <Controller
              control={control}
              name="termsAgreement"
              render={({ field }) => {
                return (
                  <Checkbox value={field.value} onToggle={field.onChange} size={16} checkIconSize={10} br={1} ml="md" mt="md">
                    <Text ml="md" color="gray" variant="14-mid" flex t18n="logged_in:credit_report:download:order:agree_terms" />
                  </Checkbox>
                );
              }}
            />
            <View mt="lg">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Select
                    icon="PhoneIcon"
                    loading={loadingMe}
                    data={generatedPhones}
                    onValueChange={field.onChange}
                    value={field.value as unknown as Option}
                    renderEmpty={
                      <PhoneOrEmailModule
                        type="PHONE"
                        onSuccess={getMe}
                        trigger={
                          <View bg="blue" p="md" br={8}>
                            <Text variant="14-semi" color="white" t18n="ui:add" textAlign="center" />
                          </View>
                        }
                      />
                    }
                    placeholder={t('logged_in:credit_report:download:order:select_phone')}
                  />
                )}
              />
            </View>
            <FilledButton
              br={6}
              mt="lg"
              bg="blue"
              loading={loading}
              disabled={!isValid}
              textProps={{ variant: '14-reg' }}
              onPress={handleSubmit(onSubmitWithReset)}
              t18n="logged_in:credit_report:download:order:button"
            />
          </View>
        );
      }}
    </Form>
  );
};

export default Order;
