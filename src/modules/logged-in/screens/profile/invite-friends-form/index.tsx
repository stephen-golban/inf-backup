import React from 'react';
import { TextInput } from 'react-native';

import useInviteFriendsModule from './hooks';

import { FilledButton, Form, FormInput, PhoneInput, Screen, Text, View } from '@components/common';

import { invite_friends_form_schema, type InviteFriendsFormFields } from './resolver';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IInviteFriendsModule {
  loading: boolean;
  onSubmit(args: InviteFriendsFormFields): void;
}

const InviteFriendsFormModule: React.FC<IInviteFriendsModule> = ({ loading, onSubmit }) => {
  const { DEFAULT_VALUES } = useInviteFriendsModule();

  const phoneRef = React.useRef<TextInput>(null);
  const emailRef = React.useRef<TextInput>(null);
  const firstNameRef = React.useRef<TextInput>(null);
  const lastNameRef = React.useRef<TextInput>(null);

  return (
    <KeyboardAwareScrollView bounces={false} keyboardShouldPersistTaps="handled" style={{ backgroundColor: 'white' }}>
      <Screen pt="zero" scroll unsafe bg="white">
        <Text variant="14-mid" t18n="profile:invite_friends:invite_friend" center />

        <Form defaultValues={DEFAULT_VALUES} resolver={invite_friends_form_schema}>
          {({ setValue, watch, formState, handleSubmit }) => {
            return (
              <View fill>
                <View fill>
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
                </View>
                <View rg="sm" mt="xl">
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
      </Screen>
    </KeyboardAwareScrollView>
  );
};

export { InviteFriendsFormModule };
