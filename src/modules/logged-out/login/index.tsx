import React from 'react';
import { TextInput } from 'react-native';

import { AuthLayout } from '@components/layouts';
import { FilledButton, Form, View } from '@components/common';
import { LoggedOutPasswordInput, LoggedOutPhoneInput, TermsAgreements, TextRow } from '../parts';

import { login_form_schema, type LoginFormFields } from './resolver';

import { DEFAULT_VALUES } from './mock';

interface ILoginModule {
  loading?: boolean;
  onPressRegister(): void;
  onPressForgotPassword(): void;
  onSubmit(args: LoginFormFields): void;
}

const LoginModule: React.FC<ILoginModule> = ({ onPressForgotPassword, onPressRegister, loading, onSubmit }) => {
  const passwordRef = React.useRef<TextInput>(null);

  return (
    <AuthLayout page_title="logged_out:login:page_title">
      <Form defaultValues={DEFAULT_VALUES} resolver={login_form_schema}>
        {({ setValue, watch, control, formState, handleSubmit }) => {
          return (
            <View fill>
              <View fill>
                <LoggedOutPhoneInput
                  value={watch('phone')}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onChange={txt => setValue('phone', txt, { shouldValidate: true })}
                />
                <LoggedOutPasswordInput ref={passwordRef} />

                <TermsAgreements control={control} />
              </View>
              <View rg="sm" mt="xl">
                <TextRow title="logged_out:login:questions:register" onPress={onPressRegister} />
                <TextRow title="logged_out:login:questions:forgot_password" onPress={onPressForgotPassword} />
                <FilledButton
                  mt="xl"
                  bg="blue"
                  t18n="ui:continue"
                  loading={loading}
                  disabled={!formState.isValid}
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export { LoginModule };
