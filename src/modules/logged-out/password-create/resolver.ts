import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';
import { yupPasswordValidation } from '@library/yup-validate';
import { type InferType, object, string, ref } from 'yup';

const shape = object({
  password: yupPasswordValidation,
  password_confirm: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .oneOf([ref('password')], stringifyObjectValidate({ keyT: 'validation:password:_match' })),
});

const password_create_form_schema = yupResolver(shape);

type PasswordCreateFormFields = InferType<typeof shape>;

export { password_create_form_schema, type PasswordCreateFormFields };
