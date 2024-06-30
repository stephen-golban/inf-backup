import React from 'react';

import usePasswordCreateModule from './hooks';

import { TextInput } from 'react-native';
import { AuthLayout } from '@components/layouts';
import { LoggedOutPasswordInput } from '../parts';
import { FilledButton, Form, View } from '@components/common';

import { password_create_form_schema, type PasswordCreateFormFields } from './resolver';

interface IOneTimePasswordModule {
  onSubmit(args: PasswordCreateFormFields): void;
}

const PasswordCreateModule: React.FC<IOneTimePasswordModule> = ({ onSubmit }) => {
  const { DEFAULT_VALUES } = usePasswordCreateModule();

  const passwordConfirmRef = React.useRef<TextInput>(null);

  return (
    <AuthLayout page_title="logged_out:password-create:page_title">
      <Form defaultValues={DEFAULT_VALUES} resolver={password_create_form_schema}>
        {({ formState, handleSubmit }) => {
          return (
            <View fill mt="md">
              <View fill>
                <LoggedOutPasswordInput onSubmitEditing={() => passwordConfirmRef.current?.focus()} />
                <LoggedOutPasswordInput
                  ref={passwordConfirmRef}
                  name="password_confirm"
                  placeholderI18n="ui:placeholders:password_confirm_placeholder"
                />
              </View>
              <View rg="sm" mt="xl">
                <FilledButton t18n="ui:continue" bg="blue" mt="xl" disabled={!formState.isValid} onPress={handleSubmit(onSubmit)} />
              </View>
            </View>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export { PasswordCreateModule };
