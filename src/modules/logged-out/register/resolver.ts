import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string, date } from 'yup';

import { subYears } from 'date-fns';
import { REGEX } from '@library/constants';
import { yupTermsAndAgreements } from '@library/yup-validate';

const shape = object({
  email: string()
    .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),

  birthDate: date()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(subYears(new Date(), 18)),

  identityNumber: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(13, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 13 } })),

  firstName: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .matches(/^[A-Z][a-z]+$/, stringifyObjectValidate({ keyT: 'validation:invalid_format' }))
    .min(3, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 3 } })),

  lastName: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .matches(/^[A-Z][a-z]+$/, stringifyObjectValidate({ keyT: 'validation:invalid_format' }))
    .min(3, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 3 } })),

  phone: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(8, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 8 } })),
  ...yupTermsAndAgreements,
});

const register_form_schema = yupResolver(shape);

type RegisterFormFields = InferType<typeof shape>;

export { register_form_schema, type RegisterFormFields };
