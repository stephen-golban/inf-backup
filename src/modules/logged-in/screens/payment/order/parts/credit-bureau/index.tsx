import React from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Dropdown, Text, View } from '@components/common';

import { CREDIT_BUREAU_MOCK } from './mock';

import type { CreditReportOrderFormFields } from '../../resolver';

interface ICreditBureau {
  control: Control<CreditReportOrderFormFields>;
}

const CreditBureau: React.FC<ICreditBureau> = ({ control }) => {
  return (
    <View mt="lg">
      <Text ml="sm" variant="16-semi" t18n="logged_in:payment:credit_report_order:choose_credit_bureau" />
      <View mt="sm">
        <Controller
          control={control}
          name="credit_bureau"
          render={({ field }) => {
            const defaultValue = CREDIT_BUREAU_MOCK.find(item => item.value === field.value);
            return (
              <Dropdown bg="softGray" data={CREDIT_BUREAU_MOCK} defaultValue={defaultValue} onChange={arg => field.onChange(arg.value)} />
            );
          }}
        />
      </View>
    </View>
  );
};

export { CreditBureau };
