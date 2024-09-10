import React from 'react';

import { useAppStore } from '@store/app';
import { Controller, type Control, type UseFormWatch } from 'react-hook-form';

import { BaseButton, Checkbox, FormInput, Text, View } from '@components/common';

import type { CreditReportOrderFormFields } from '../../resolver';

interface EmailSelectionProps {
  control: Control<CreditReportOrderFormFields>;
  watch: UseFormWatch<CreditReportOrderFormFields>;
}

const EmailSelect: React.FC<EmailSelectionProps> = ({ control, watch }) => {
  const user = useAppStore(state => state.user);

  const emails = user?.contactData.filter(item => item.type === 'EMAIL').map(item => item.value);

  return (
    <View>
      <Controller
        control={control}
        name="sendEmail"
        render={({ field }) => (
          <Checkbox size={20} checkIconSize={14} reverse onToggle={option => field.onChange(option)} value={field.value}>
            <Text flex variant="14-semi" t18n="logged_in:payment:credit_report_order:email_send" />
          </Checkbox>
        )}
      />
      {watch('sendEmail') && (
        <View mt="lg">
          {emails?.map((item, idx) => (
            <Controller
              key={item + idx}
              control={control}
              name="email"
              render={({ field }) => (
                <BaseButton bg={field.value === item ? 'blue' : 'softGray'} py="sm" px="xs" mb="sm" onPress={() => field.onChange(item)}>
                  <Text variant="14-reg" color={field.value === item ? 'white' : 'black'}>
                    {item}
                  </Text>
                </BaseButton>
              )}
            />
          ))}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormInput
                {...field}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                placeholderI18n="ui:placeholders:custom_email_placeholder"
                value={field.value && !emails?.includes(field.value) ? field.value : ''}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export { EmailSelect };
