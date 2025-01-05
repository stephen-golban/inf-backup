import examples from 'libphonenumber-js/mobile/examples';
import DeviceCountry, { TYPE_CONFIGURATION, TYPE_TELEPHONY } from 'react-native-device-country';
import parsePhoneNumber, { CountryCode, getExampleNumber, NationalNumber } from 'libphonenumber-js';
import { countries } from '@library/constants';
import { isAndroid } from '@library/method';

const createPlaceholder = (number: NationalNumber | undefined, formatted: string | undefined) => {
  if (!number || !formatted) return PHONE_UTILS.placeholder;

  const [, firstPart, ...rest] = formatted.split(' ');

  const pattern = [firstPart, ...rest.map(part => 'X'.repeat(part.length))].join(' ');

  return pattern;
};

const createPhonePattern = (str: string | undefined, isFull = false) => {
  if (!str) return isFull ? PHONE_UTILS.fullPattern : PHONE_UTILS.pattern;

  return str.replace(/\S/g, '#');
};

const phoneFormatter = (pattern: string, v: string) => {
  let i = 0;
  return pattern.replace(/#/g, _ => v[i++] || ' ').trim();
};

const validatePhone = (phone: string = '') => {
  return phone.replace(/[^0-9]/g, '');
};

const removeWhiteSpaces = (val: string) => val.split(/\s+/).join('');

const getCountryFlag = (cca2: CountryCode) => {
  const country = countries.find(c => c.cca2 === cca2);
  return country?.flag;
};

const PHONE_UTILS = {
  dial_code: '+373',
  pattern: '## ### ###',
  formatted: '79123456',
  number: '79123456',
  placeholder: '79XXXXXX',
  flag: getCountryFlag('MD'),
  fullPattern: '#### ### ## ###',
};

const createPhoneUtil = (cca2: CountryCode | null) => {
  if (!cca2) return PHONE_UTILS;
  const example = getExampleNumber(cca2, examples)?.number;
  if (!example) return PHONE_UTILS;
  const details = parsePhoneNumber(example, cca2);
  const formatted = details?.formatInternational();

  const placeholder = createPlaceholder(details?.nationalNumber, formatted);
  const pattern = createPhonePattern(placeholder);
  const fullPattern = createPhonePattern(formatted, true);
  const dial_code = details?.countryCallingCode;
  const flag = getCountryFlag(cca2);
  const number = details?.nationalNumber;

  return {
    flag,
    pattern,
    formatted,
    dial_code,
    placeholder,
    fullPattern,
    number,
  };
};

const fullPhoneNumberFormatter = (pattern: string, val: string): string => {
  return phoneFormatter(pattern, val);
};

const validatePhoneNumberValue = (pattern: string, val: string | undefined) => {
  if (!val) return '';
  return phoneFormatter(pattern, validatePhone(val));
};

const getDefaultCountryCode = async (): Promise<string> => {
  try {
    if (isAndroid) {
      const telephony = await DeviceCountry.getCountryCode(TYPE_TELEPHONY);
      const config = await DeviceCountry.getCountryCode(TYPE_CONFIGURATION);

      if (!telephony?.code || !config?.code) return 'MD';

      return telephony.code || config.code;
    }
    // iOS - use default method
    const result = await DeviceCountry.getCountryCode();
    if (!result?.code) return 'MD';

    return result.code;
  } catch (error) {
    console.error('Error getting country code:', error);
    return 'MD';
  }
};

const phoneNumberService = {
  getCountryFlag,
  createPhoneUtil,
  removeWhiteSpaces,
  getDefaultCountryCode,
  fullPhoneNumberFormatter,
  validatePhoneNumberValue,
};

export { phoneNumberService };

export type PhoneUtil = ReturnType<typeof createPhoneUtil>;
