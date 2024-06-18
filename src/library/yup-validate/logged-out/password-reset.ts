import { type InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

const shape = object({
  email: string()
    .required(stringifyObjectValidate({ keyT: 'validation:email_required' }))
    .email(stringifyObjectValidate({ keyT: 'validation:email_valid_address' })),
});

const reset_password_form_schema = yupResolver(shape);

type ResetPasswordFormFields = InferType<typeof shape>;

export { reset_password_form_schema, type ResetPasswordFormFields };
