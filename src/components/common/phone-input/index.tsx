import React from 'react';
import { useUpdateEffect } from 'react-use';
import { useCurrentCca2 } from '@library/hooks';
import { phoneNumberService } from '@services/phone-number';
import { setPhoneNumberInputStore } from '@store/phone-number-input';

import { CountryPicker } from './parts';
import { FormInput } from '@components/common';

import type { PhoneInputProps } from './type';
import type { CountryCode } from 'libphonenumber-js';

const CONSTANTS = {
  PX_PER_DIGIT: 8,
  BASE_PADDING_LEFT: 70,
} as const;

export const PhoneInput = React.forwardRef<any, PhoneInputProps>((props, ref) => {
  const { value, onChangeText, name = 'phone', returnKeyType = 'next', disabled = false, ...rest } = props;

  const { cca2: defaultCCA2 } = useCurrentCca2();
  const [cca2, setCca2] = React.useState<CountryCode>(defaultCCA2 || 'MD');

  const util = React.useMemo(() => phoneNumberService.createPhoneUtil(cca2), [cca2]);

  const validatedValue = React.useMemo(() => {
    if (!value) return '';
    const withoutDialCode = value.replace(`+${util.dial_code}`, '');
    return phoneNumberService.validatePhoneNumberValue(util.pattern, withoutDialCode);
  }, [value, util.pattern, util.dial_code]);

  const paddingLeft = React.useMemo(() => {
    const length = `+${util.dial_code}`.length;
    return CONSTANTS.BASE_PADDING_LEFT + length * CONSTANTS.PX_PER_DIGIT;
  }, [util.dial_code]);

  const handleChangeText = React.useCallback(
    (text: string) => {
      const cleaned = phoneNumberService.removeWhiteSpaces(text);
      onChangeText?.(`+${util.dial_code}${cleaned}`);
    },
    [util.dial_code, onChangeText],
  );

  const handleChangeCountryCode = React.useCallback(
    (newCca2: CountryCode) => {
      setCca2(newCca2);
      onChangeText?.('');
    },
    [onChangeText],
  );

  React.useEffect(() => {
    const dialLength = `+${util.dial_code}`.length;
    const numberLength = `${util.number}`.length;
    const minLength = numberLength + dialLength;

    setPhoneNumberInputStore({
      minLength,
      displayLength: numberLength,
    });
  }, [util.fullPattern, util.number, util.dial_code]);

  return (
    <FormInput
      ref={ref}
      name={name}
      autoComplete="tel"
      autoCapitalize="none"
      value={validatedValue}
      style={{ paddingLeft }}
      keyboardType="phone-pad"
      textContentType="username"
      editable={!disabled}
      returnKeyType={returnKeyType}
      placeholder={util.placeholder}
      onChangeText={handleChangeText}
      maxLength={util.placeholder.length}
      prefix={<CountryPicker util={util} onSelect={handleChangeCountryCode} disabled={disabled} />}
      {...rest}
    />
  );
});

PhoneInput.displayName = 'PhoneInput';
