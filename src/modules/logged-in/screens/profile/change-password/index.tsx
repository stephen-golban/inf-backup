import React from 'react';
import { DEFAULT_VALUES } from './hooks';
import { change_password_form_schema } from './resolver';
import { LoggedOutPasswordInput } from '@modules/logged-out/parts';
import { FilledButton, Form, Icon, KeyboardAware, Text, View } from '@components/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IChangePasswordModule {
  loading: boolean;
  onSubmit(arg: any): void;
}

const ChangePasswordModule: React.FC<IChangePasswordModule> = ({ loading, onSubmit }) => {
  return (
    <View px="md" mt="lg">
      <Text t18n="profile:my_account:account_details:change_password" />
      <Form defaultValues={DEFAULT_VALUES} resolver={change_password_form_schema}>
        {({ formState, handleSubmit, watch }) => {
          const newPassword = watch('new_password');
          const isMinLengthValid = newPassword.length >= 8;
          const isUppercaseValid = /[A-Z]/.test(newPassword);
          const isSpecialCharValid = /[\W_]/.test(newPassword);
          const isDigitValid = /\d/.test(newPassword);

          return (
            <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps="handled">
              <View fill>
                <LoggedOutPasswordInput
                  returnKeyType="next"
                  name="current_password"
                  placeholderI18n="profile:my_account:change_password_section:current_password"
                />
                <LoggedOutPasswordInput
                  returnKeyType="next"
                  name="new_password"
                  placeholderI18n="profile:my_account:change_password_section:new_password"
                />
                <View g="sm" my="sm">
                  <View row g="xs" mt="md">
                    <Icon
                      icon={isMinLengthValid ? 'CheckCircleIcon' : 'CircleIcon'}
                      color={isMinLengthValid ? 'skyBlue' : 'gray'}
                      size={15}
                    />
                    <Text variant="12-reg" center t18n="profile:my_account:change_password_section:min_8_chars" />
                  </View>
                  <View row g="xs">
                    <Icon
                      icon={isUppercaseValid ? 'CheckCircleIcon' : 'CircleIcon'}
                      color={isUppercaseValid ? 'skyBlue' : 'gray'}
                      size={15}
                    />
                    <Text variant="12-reg" center t18n="profile:my_account:change_password_section:min_1_uppercase" />
                  </View>
                  <View row g="xs">
                    <Icon
                      icon={isSpecialCharValid ? 'CheckCircleIcon' : 'CircleIcon'}
                      color={isSpecialCharValid ? 'skyBlue' : 'gray'}
                      size={15}
                    />
                    <Text variant="12-reg" center t18n="profile:my_account:change_password_section:min_1_symbol" />
                  </View>
                  <View row g="xs">
                    <Icon icon={isDigitValid ? 'CheckCircleIcon' : 'CircleIcon'} color={isDigitValid ? 'skyBlue' : 'gray'} size={15} />
                    <Text variant="12-reg" center t18n="profile:my_account:change_password_section:min_1_digit" />
                  </View>
                </View>
                <View rg="sm">
                  <FilledButton
                    mt="xl"
                    bg="blue"
                    t18n="ui:save"
                    loading={loading}
                    disabled={!formState.isValid}
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Form>
    </View>
  );
};

export { ChangePasswordModule };
