import React from 'react';
import { TextInput } from 'react-native';

import { AuthLayout } from '@components/layouts';
import { LoggedOutPasswordInput, TermsAgreements, TextRow } from '../parts';
import { FilledButton, Form, Icon, PhoneInput, View } from '@components/common';

import { DEFAULT_VALUES } from './mock';
import { login_form_schema, type LoginFormFields } from './resolver';

interface ILoginModule {
  loading?: boolean;
  onPressMpass(): void;
  mpassLoading?: boolean;
  onPressRegister(): void;
  onPressForgotPassword(): void;
  onSubmit(args: LoginFormFields): void;
}

const LoginModule: React.FC<ILoginModule> = ({ onPressForgotPassword, onPressRegister, loading, onSubmit, onPressMpass, mpassLoading }) => {
  const passwordRef = React.useRef<TextInput>(null);

  return (
    <AuthLayout page_title="logged_out:login:page_title">
      <Form defaultValues={DEFAULT_VALUES} resolver={login_form_schema}>
        {({ setValue, control, formState, handleSubmit, getValues }) => {
          const termsAccepted = getValues('terms_conditions_agreement');

          return (
            <View fill>
              <View fill>
                <PhoneInput
                  value={getValues('phone')}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onChangeText={txt => setValue('phone', txt, { shouldValidate: true })}
                />
                <LoggedOutPasswordInput contextMenuHidden={true} ref={passwordRef} />

                <TermsAgreements control={control} />
              </View>
              <View rg="sm" mt="xl">
                <FilledButton
                  disabled={!termsAccepted}
                  bg="lightBlue"
                  w={115}
                  h={39}
                  loading={mpassLoading}
                  alignSelf="center"
                  onPress={onPressMpass}>
                  <Icon icon="MpassIcon" disabled={!termsAccepted} />
                </FilledButton>
                <View mt="md" rg="sm">
                  <TextRow title="logged_out:login:questions:register" onPress={onPressRegister} />
                  <TextRow title="logged_out:login:questions:forgot_password" onPress={onPressForgotPassword} />
                </View>
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
