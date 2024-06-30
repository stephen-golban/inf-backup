import React from 'react';

import { FormInput, TextInputProps } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface ILoggedOutPasswordInput extends Pick<TextInputProps, 'onSubmitEditing'> {
  name?: string;
  placeholderI18n?: I18nKey;
}

const LoggedOutPasswordInput = React.forwardRef<any, ILoggedOutPasswordInput>((props, ref) => {
  const { name = 'password', placeholderI18n = 'ui:placeholders:password_placeholder', onSubmitEditing } = props;
  return (
    <FormInput
      ref={ref}
      name={name}
      secureTextEntry
      returnKeyType="done"
      autoCapitalize="none"
      autoComplete="password"
      textContentType="password"
      onSubmitEditing={onSubmitEditing}
      placeholderI18n={placeholderI18n}
    />
  );
});

export { LoggedOutPasswordInput };
