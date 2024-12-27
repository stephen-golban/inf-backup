import React from 'react';
import { TextInput } from 'react-native';

import useRegisterModule from './hooks';
import { format, subYears } from 'date-fns';

import { AuthLayout } from '@components/layouts';
import { TermsAgreements, TextRow } from '../parts';
import { DatePicker, FilledButton, Form, FormInput, Icon, PhoneInput, Text, View } from '@components/common';

import { Controller } from 'react-hook-form';
import { register_form_schema, type RegisterFormFields } from './resolver';

interface IRegisterModule {
  loading: boolean;
  onPressLogin(): void;
  onSubmit(args: RegisterFormFields): void;
}

const RegisterModule: React.FC<IRegisterModule> = ({ loading, onPressLogin, onSubmit }) => {
  const { DEFAULT_VALUES } = useRegisterModule();

  const phoneRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const firstNameRef = React.useRef<TextInput>(null);
  const lastNameRef = React.useRef<TextInput>(null);
  const promoCodeRef = React.useRef<TextInput>(null);

  return (
    <AuthLayout page_title="logged_out:register:page_title" isLongSheet>
      <Form defaultValues={DEFAULT_VALUES} resolver={register_form_schema}>
        {({ setValue, watch, control, formState, handleSubmit }) => {
          return (
            <View fill>
              <View fill>
                <FormInput
                  maxLength={13}
                  placeholder="IDNP"
                  autoComplete="off"
                  autoCorrect={false}
                  returnKeyType="next"
                  name="identityNumber"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  onSubmitEditing={() => firstNameRef.current?.focus()}
                />
                <FormInput
                  name="firstName"
                  ref={firstNameRef}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="words"
                  autoComplete="given-name"
                  textContentType="givenName"
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                  placeholderI18n={'ui:placeholders:first_name_placeholder'}
                />

                <FormInput
                  name="lastName"
                  ref={lastNameRef}
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="words"
                  autoComplete="family-name"
                  textContentType="familyName"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  placeholderI18n={'ui:placeholders:last_name_placeholder'}
                />

                <FormInput
                  name="email"
                  ref={emailRef}
                  autoCorrect={false}
                  placeholder="Email"
                  autoComplete="email"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />
                <PhoneInput
                  ref={phoneRef}
                  value={watch('phone')}
                  onSubmitEditing={() => phoneRef.current?.blur()}
                  onChangeText={txt => setValue('phone', txt, { shouldValidate: true })}
                />

                <View mt={20}>
                  <Controller
                    name="birthDate"
                    render={({ field }) => {
                      return (
                        <DatePicker date={field.value} max={subYears(new Date(), 18)} onConfirm={date => field.onChange(date)}>
                          <View mb="md" pl="sm" h={48} bg="lightBlue" br={48} justify="center">
                            <View row align="center">
                              <Icon icon="CalendarIcon" mr="sm" />
                              <Text color="secondary" variant="14-mid">
                                {format(watch('birthDate') || subYears(new Date(), 18), 'yyyy-MM-dd')}
                              </Text>
                            </View>
                          </View>
                        </DatePicker>
                      );
                    }}
                  />
                </View>

                <FormInput
                  name="promoCode"
                  ref={promoCodeRef}
                  autoCorrect={false}
                  returnKeyType="next"
                  maxLength={13}
                  autoCapitalize="words"
                  onSubmitEditing={() => promoCodeRef.current?.focus()}
                  placeholderI18n={'ui:placeholders:promo_code'}
                />

                <TermsAgreements control={control} />
              </View>
              <View rg="sm" mt="xl">
                <TextRow title="logged_out:forgot-password:questions:authentication" onPress={onPressLogin} />
                <FilledButton
                  t18n="ui:continue"
                  bg="blue"
                  mt="xl"
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

export { RegisterModule };
