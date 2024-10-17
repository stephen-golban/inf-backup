import React from 'react';

import { usePhoneNumberService } from '@services/phone-number';

import { FormInput, Text } from '@components/common';

interface ILoggedOutPhoneInput {
  value: string;
  autoFocus?: boolean;
  onSubmitEditing?(): void;
  onChange(value: string): void;
}

const LoggedOutPhoneInput = React.forwardRef<any, ILoggedOutPhoneInput>(({ onChange, onSubmitEditing, value, autoFocus = false }, ref) => {
  const { removeWhiteSpaces, validatePhoneNumberValue, validatedPhoneNumberPlaceholder } = usePhoneNumberService();

  return (
    <FormInput
      ref={ref}
      autoFocus={autoFocus}
      name="phone"
      maxLength={10}
      autoComplete="tel"
      returnKeyType="next"
      autoCapitalize="none"
      keyboardType="phone-pad"
      textContentType="username"
      onSubmitEditing={onSubmitEditing}
      value={validatePhoneNumberValue(value)}
      placeholder={validatedPhoneNumberPlaceholder}
      prefix={<Text text="+373" variant="16-semi" />}
      onChangeText={txt => onChange(removeWhiteSpaces(txt))}
    />
  );
});

export { LoggedOutPhoneInput };
