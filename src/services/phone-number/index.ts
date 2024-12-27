import examples from 'libphonenumber-js/mobile/examples';
import parsePhoneNumber, { CountryCode, getExampleNumber, NationalNumber } from 'libphonenumber-js';
import { countries } from '@library/constants';

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

const getDefaultCountryCode = async () => {
  try {
    const res = await fetch('https://ipapi.co/json');
    if (res.status === 200) {
      const { country_code } = await res.json();
      return country_code as string;
    }
    return 'MD';
  } catch (error) {
    console.error('Error fetching geo data:', error);
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
