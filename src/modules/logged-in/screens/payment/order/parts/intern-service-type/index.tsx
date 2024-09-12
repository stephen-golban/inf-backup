import React from 'react';

import { Controller, type Control } from 'react-hook-form';

import { Dropdown, Text, View } from '@components/common';

import { SERVICE_TYPE_MOCK } from './mock';

import type { CreditReportOrderFormFields } from '../../resolver';

interface IInternServiceType {
  isReportOnly?: boolean;
  control: Control<CreditReportOrderFormFields>;
}

const InternServiceType: React.FC<IInternServiceType> = ({ control, isReportOnly }) => {
  const options = React.useMemo(() => {
    if (isReportOnly) {
      return SERVICE_TYPE_MOCK.filter(item => item.value === 'CLIENT_REQUEST');
    }
    return SERVICE_TYPE_MOCK;
  }, [isReportOnly]);

  return (
    <View mt="lg">
      <Text ml="sm" variant="16-semi" t18n="logged_in:payment:credit_report_order:choose_service_type" />
      <View mt="sm">
        <Controller
          control={control}
          name="internServiceType"
          render={({ field }) => {
            const defaultValue = options.find(item => item.value === field.value);
            return <Dropdown bg="lightBlue" data={options} defaultValue={defaultValue} onChange={arg => field.onChange(arg.value)} />;
          }}
        />
      </View>
    </View>
  );
};

export { InternServiceType };
