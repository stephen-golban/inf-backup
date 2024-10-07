import React from 'react';

import { chain, isEmpty } from 'lodash';
import { useAppStore } from '@store/app';
import { useTranslation } from '@library/hooks';

import { Controller } from 'react-hook-form';
import { FilledButton, Form, RadioGroup, Select, Text, View } from '@components/common';

import { email_send_schema } from './resolver';

import type { Option } from '@rn-primitives/select';
import { useCreateCreditReportService } from '@services/use-create-credit-report';

interface ISendEmail {
  reportId: number;
}

const SendEmail: React.FC<ISendEmail> = ({ reportId }) => {
  const { t } = useTranslation();
  const user = useAppStore(state => state.user);
  const { createPDF, loading } = useCreateCreditReportService();

  const generatedEmails = React.useMemo(() => {
    if (!user || isEmpty(user.contactData)) return [];

    return chain(user.contactData)
      .filter({ type: 'EMAIL' })
      .map(({ value }) => ({ value, label: value }))
      .value();
  }, [user]);

  const onSubmit = (email: string) => createPDF(reportId, { email });

  return (
    <Form resolver={email_send_schema} defaultValues={{ sendEmail: false, email: undefined }}>
      {({ control, handleSubmit, watch, formState: { isValid } }) => {
        const canSendEmail = watch('sendEmail');

        return (
          <View mt="lg">
            <View row align="center" between>
              <Text variant="14-bold" t18n="logged_in:credit_report:download:email:want" color="blue" flex />
              <Controller
                control={control}
                name="sendEmail"
                render={({ field }) => (
                  <RadioGroup
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                    ]}
                    defaultValue={field.value ? 'yes' : 'no'}
                    onValueChange={val => field.onChange(val === 'yes')}
                  />
                )}
              />
            </View>
            {canSendEmail && (
              <View mt="lg">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Select
                      icon="ForwardToInboxIcon"
                      data={generatedEmails}
                      onValueChange={field.onChange}
                      value={field.value as unknown as Option}
                      placeholder={t('logged_in:credit_report:download:email:select')}
                    />
                  )}
                />
                <FilledButton
                  br={6}
                  mt="lg"
                  bg="blue"
                  t18n="ui:send"
                  loading={loading}
                  disabled={!isValid}
                  onPress={handleSubmit(d => onSubmit(d.email || ''))}
                />
              </View>
            )}
          </View>
        );
      }}
    </Form>
  );
};

export default SendEmail;
