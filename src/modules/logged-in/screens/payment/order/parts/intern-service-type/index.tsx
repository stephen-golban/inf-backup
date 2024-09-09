import React from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Dropdown, Text, View } from '@components/common';

import { SERVICE_TYPE_MOCK } from './mock';

import type { CreditReportOrderFormFields } from '../../resolver';

interface IInternServiceType {
  control: Control<CreditReportOrderFormFields>;
}

const InternServiceType: React.FC<IInternServiceType> = ({ control }) => {
  return (
    <View mt="lg">
      <Text ml="sm" variant="16-semi" t18n="logged_in:payment:credit_report_order:choose_service_type" />
      <View mt="sm">
        <Controller
          control={control}
          name="internServiceType"
          render={({ field }) => {
            const defaultValue = SERVICE_TYPE_MOCK.find(item => item.value === field.value);
            return (
              <Dropdown bg="lightBlue" data={SERVICE_TYPE_MOCK} defaultValue={defaultValue} onChange={arg => field.onChange(arg.value)} />
            );
          }}
        />
      </View>
    </View>
  );
};

export { InternServiceType };
