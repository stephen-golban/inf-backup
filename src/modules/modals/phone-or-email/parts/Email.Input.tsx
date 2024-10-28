import React from 'react';
import { FormInput } from '@components/common';

const EmailInput = () => {
  return (
    <FormInput
      name="email"
      autoCorrect={false}
      placeholder="Email"
      autoComplete="email"
      returnKeyType="next"
      autoCapitalize="none"
      keyboardType="email-address"
      textContentType="emailAddress"
    />
  );
};

export { EmailInput };
