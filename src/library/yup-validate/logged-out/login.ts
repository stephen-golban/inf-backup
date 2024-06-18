import { type InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

const shape = object({
  email: string()
    .required(stringifyObjectValidate({ keyT: 'validation:email_required' }))
    .email(stringifyObjectValidate({ keyT: 'validation:email_valid_address' })),
  password: string()
    .required(stringifyObjectValidate({ keyT: 'validation:password_required' }))
    .min(8, stringifyObjectValidate({ keyT: 'validation:password_length_error' })),
});

const login_form_schema = yupResolver(shape);

type LoginFormFields = InferType<typeof shape>;

export { login_form_schema, type LoginFormFields };
