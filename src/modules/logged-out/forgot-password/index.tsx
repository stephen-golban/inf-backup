import React from 'react';

import { Controller } from 'react-hook-form';
import useForgotPasswordModule from './hooks';

import { AuthLayout } from '@components/layouts';
import { LoggedOutPhoneInput, TermsAgreements, TextRow } from '../parts';
import { Dropdown, FilledButton, Form, FormInput, View } from '@components/common';

import { forgot_password_form_schema, type ForgotPasswordFormFields } from './resolver';

import { DROPDOWN_OPTIONS } from './mock';

interface IForgotPasswordModule {
  onPressQuestion(): void;
  onSubmit(args: ForgotPasswordFormFields): void;
}

const ForgotPasswordModule: React.FC<IForgotPasswordModule> = ({ onPressQuestion, onSubmit }) => {
  const { DEFAULT_VALUES, getOption } = useForgotPasswordModule();

  return (
    <AuthLayout page_title="logged_out:forgot-password:page_title">
      <Form defaultValues={DEFAULT_VALUES} resolver={forgot_password_form_schema}>
        {({ setValue, resetField, watch, control, formState, handleSubmit, getValues }) => {
          return (
            <View fill mt="md">
              <View fill>
                <Controller
                  control={control}
                  name="selected_type"
                  render={({ field }) => {
                    return (
                      <Dropdown
                        bg="lightBlue"
                        data={DROPDOWN_OPTIONS}
                        defaultValue={getOption(field.value)}
                        onChange={selected => {
                          field.onChange(selected.value);
                          resetField(selected === DROPDOWN_OPTIONS[0] ? 'phone' : 'email');
                        }}
                      />
                    );
                  }}
                />

                {watch('selected_type') === DROPDOWN_OPTIONS[0].value && (
                  <LoggedOutPhoneInput value={watch('phone') || ''} onChange={txt => setValue('phone', txt, { shouldValidate: true })} />
                )}
                {watch('selected_type') === DROPDOWN_OPTIONS[1].value && (
                  <FormInput
                    name="email"
                    autoCorrect={false}
                    placeholder="Email"
                    autoComplete="email"
                    returnKeyType="next"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                  />
                )}

                <TermsAgreements control={control} />
              </View>
              <View rg="sm" mt="xl">
                <TextRow title="logged_out:forgot-password:questions:authentication" onPress={onPressQuestion} />
                <FilledButton t18n="ui:continue" bg="blue" mt="xl" disabled={!formState.isValid} onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export { ForgotPasswordModule };
