import React from 'react';

import { chain, isEmpty } from 'lodash';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTranslation } from '@library/hooks';
import { useToast } from 'react-native-toast-notifications';

import { Controller } from 'react-hook-form';
import { FilledButton, Form, RadioGroup, Select, Text, View } from '@components/common';

import { email_send_schema } from './resolver';

import type { Option } from '@rn-primitives/select';

interface ISendEmail {
  reportId: number;
}

const SendEmail: React.FC<ISendEmail> = ({ reportId }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const user = useAppStore(state => state.user);
  const { locale } = useAppStore(state => state);
  const [call, { loading }] = useLazyAxios(`/credit-report/${reportId}/files/PDF`, { method: 'get' });

  const generatedEmails = React.useMemo(() => {
    if (!user || isEmpty(user.contactData)) return [];

    return chain(user.contactData)
      .filter({ type: 'EMAIL' })
      .map(({ value }) => ({ value, label: value }))
      .value();
  }, [user]);

  const onSubmit = async (email: string) => {
    await call(undefined, () => toast.show(t('ui:success'), { type: 'success' }), {
      params: { email, language: locale === 'ro' ? 'RO' : locale === 'ru' ? 'RU' : 'EN' },
    });
  };

  return (
    <Form resolver={email_send_schema} defaultValues={{ sendEmail: false, email: undefined }}>
      {({ control, handleSubmit, watch, formState: { isValid }, setValue }) => {
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
                      { value: 'yes', label: t('ui:yes') },
                      { value: 'no', label: t('ui:no') },
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
                      // typeable={isEmpty(generatedEmails)}
                      typeable
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
                  onPress={handleSubmit(d =>
                    onSubmit(d.email.value).then(() => setValue('email', undefined as any, { shouldValidate: true })),
                  )}
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
