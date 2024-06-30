import React from 'react';

import { noop } from 'lodash';
import { Controller } from 'react-hook-form';
import { useResendTimer, useOneTimePasswordModule } from './hooks';

import { ResendBlock } from './parts';
import { AuthLayout } from '@components/layouts';
import { FilledButton, Form, OneTimePasswordInput, View } from '@components/common';

import { one_time_password_form_schema, type OneTimePasswordFormFields } from './resolver';

interface IOneTimePasswordModule {
  onSubmit(args: OneTimePasswordFormFields): void;
}

const OneTimePasswordModule: React.FC<IOneTimePasswordModule> = ({ onSubmit }) => {
  const { DEFAULT_VALUES } = useOneTimePasswordModule();
  const { canResend, resetTimer, seconds } = useResendTimer();

  return (
    <AuthLayout page_title="logged_out:otp:page_title">
      <Form defaultValues={DEFAULT_VALUES} resolver={one_time_password_form_schema}>
        {({ control, formState, handleSubmit }) => {
          return (
            <View fill mt="md">
              <View fill>
                <Controller
                  name="code"
                  control={control}
                  render={({ field: { ref, ...field }, fieldState: { error } }) => {
                    return <OneTimePasswordInput {...field} error={error?.message} />;
                  }}
                />
              </View>
              <View rg="sm" mt="xl">
                <ResendBlock canResend={canResend} seconds={seconds} onPressResned={noop} />

                <FilledButton t18n="ui:continue" bg="blue" mt="xl" disabled={!formState.isValid} onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export { OneTimePasswordModule };
