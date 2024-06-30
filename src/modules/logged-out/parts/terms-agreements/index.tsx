import React from 'react';

import { View } from '@components/common';
import { CheckboxField } from './checkbox-field';
import { type Control, Controller } from 'react-hook-form';

interface ITermsAgreements<T> {
  control: Control<any> | undefined;
}

const TermsAgreements = <T,>({ control }: ITermsAgreements<T>) => {
  return (
    <View rg="md" mt="lg">
      <Controller
        control={control}
        name="terms_conditions_agreement"
        render={({ field }) => {
          return (
            <CheckboxField
              value={field.value}
              link="https://infodebit.md/articol/23"
              onToggle={option => field.onChange(option)}
              title="logged_out:login:terms_conditions_agreement"
            />
          );
        }}
      />
      <Controller
        control={control}
        name="credit_history_report_agreement"
        render={({ field }) => {
          return (
            <CheckboxField
              value={field.value}
              link="https://infodebit.md/articol/24"
              onToggle={option => field.onChange(option)}
              title="logged_out:login:credit_history_report_agreement"
            />
          );
        }}
      />
    </View>
  );
};

export { TermsAgreements };
