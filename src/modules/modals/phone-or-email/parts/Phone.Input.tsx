import React from 'react';

import { usePhoneNumberService } from '@services/phone-number';

import { FormInput, Text } from '@components/common';

interface IPhoneInput {
  value: string;
  autoFocus?: boolean;
  onChange(value: string): void;
}

const PhoneInput: React.FC<IPhoneInput> = ({ onChange, value, autoFocus = false }) => {
  const { removeWhiteSpaces, validatePhoneNumberValue, validatedPhoneNumberPlaceholder } = usePhoneNumberService();

  return (
    <FormInput
      autoFocus={autoFocus}
      name="phone"
      maxLength={10}
      autoComplete="tel"
      returnKeyType="next"
      autoCapitalize="none"
      keyboardType="phone-pad"
      textContentType="username"
      value={validatePhoneNumberValue(value)}
      placeholder={validatedPhoneNumberPlaceholder}
      prefix={<Text text="+373" variant="16-semi" />}
      onChangeText={txt => onChange(removeWhiteSpaces(txt))}
    />
  );
};

export { PhoneInput };
