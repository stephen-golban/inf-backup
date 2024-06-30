import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';
import { type InferType, object, string } from 'yup';

const shape = object({
  code: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(6, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 6 } })),
});

const one_time_password_form_schema = yupResolver(shape);

type OneTimePasswordFormFields = InferType<typeof shape>;

export { one_time_password_form_schema, type OneTimePasswordFormFields };
