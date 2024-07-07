import { type InferType, object, ref, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

const passwordValidationMessage = stringifyObjectValidate({ keyT: 'validation:field_required' });
const newPasswordValidationMessage = {
  required: stringifyObjectValidate({ keyT: 'validation:field_required' }),
  minLength: stringifyObjectValidate({ keyT: 'validation:invalid_format' }),
  uppercase: stringifyObjectValidate({ keyT: 'validation:invalid_format' }),
  specialChar: stringifyObjectValidate({ keyT: 'validation:invalid_format' }),
  match: stringifyObjectValidate({ keyT: 'validation:password:do_not_match_error' }),
};

const shape = object({
  new_password: string()
    .required(newPasswordValidationMessage.required)
    .min(8, newPasswordValidationMessage.minLength)
    .matches(/[A-Z]/, newPasswordValidationMessage.uppercase)
    .matches(/[\W_]/, newPasswordValidationMessage.specialChar),
  confirm_password: string()
    .oneOf([ref('new_password')], newPasswordValidationMessage.match)
    .required(passwordValidationMessage),
});

const change_password_form_schema = yupResolver(shape);

type ChangePasswordFormFields = InferType<typeof shape>;

export { change_password_form_schema, type ChangePasswordFormFields };
