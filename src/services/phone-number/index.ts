export const phoneFormatter = (pattern: string, v: string) => {
  let i = 0;
  return pattern.replace(/#/g, _ => v[i++] || ' ').trim();
};

const PHONE_UTILS = {
  placeholder: '79XXXXXX',
  phonePattern: '## ### ###',
  fullPhonePattern: '#### ### ## ###',
};

const validatedPhoneNumberPlaceholder = phoneFormatter(PHONE_UTILS.phonePattern, PHONE_UTILS.placeholder);

const validatePhone = (phone: string = '') => {
  return phone.replace(/[^0-9]/g, '');
};

const validatePhoneNumberValue = (val: string) => {
  return phoneFormatter(PHONE_UTILS.phonePattern, validatePhone(val));
};

export const fullPhoneNumberFormatter = (val: string): string => {
  return phoneFormatter(PHONE_UTILS.fullPhonePattern, val);
};

const removeWhiteSpaces = (val: string) => val.split(/\s+/).join('');

const usePhoneNumberService = () => {
  return {
    removeWhiteSpaces,
    fullPhoneNumberFormatter,
    validatePhoneNumberValue,
    validatedPhoneNumberPlaceholder,
  };
};

export { usePhoneNumberService };
