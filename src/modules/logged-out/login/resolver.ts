import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string } from 'yup';

import { yupPasswordValidation, yupTermsAndAgreements } from '@library/yup-validate';

const shape = object({
  phone: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(8, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 8 } })),
  password: yupPasswordValidation,
  ...yupTermsAndAgreements,
});

const login_form_schema = yupResolver(shape);

type LoginFormFields = InferType<typeof shape>;

export { login_form_schema, type LoginFormFields };
