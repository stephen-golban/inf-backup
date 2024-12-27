import { yupResolver } from '@hookform/resolvers/yup';

import { type InferType, object } from 'yup';

import { yupPasswordValidation, yupPhoneValidation, yupTermsAndAgreements } from '@library/yup-validate';

const shape = object({
  phone: yupPhoneValidation,
  password: yupPasswordValidation,
  ...yupTermsAndAgreements,
});

const login_form_schema = yupResolver(shape);

type LoginFormFields = InferType<typeof shape>;

export { login_form_schema, type LoginFormFields };
