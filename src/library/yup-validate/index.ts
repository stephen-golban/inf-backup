import { REGEX } from '@library/constants';
import { stringifyObjectValidate } from '@library/string';
import { boolean, string } from 'yup';

export const yupTermsAndAgreements = {
  terms_conditions_agreement: boolean()
    .oneOf([true], stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
};
export const yupPasswordValidation = string()
  .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
  .min(6, stringifyObjectValidate({ keyT: 'validation:password:length_error' }))
  .test('uppercase', stringifyObjectValidate({ keyT: 'validation:password:uppercase_error' }), value =>
    REGEX.uppercase.test(value as string),
  )
  .test('number', stringifyObjectValidate({ keyT: 'validation:password:number_error' }), value => REGEX.number.test(value as string))
  .test('special-character', stringifyObjectValidate({ keyT: 'validation:password:special_character_error' }), value =>
    REGEX.special_character.test(value as string),
  );
