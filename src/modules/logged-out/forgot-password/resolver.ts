import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';
import { type InferType, object, string } from 'yup';

import { yupPhoneValidationWithSchema, yupTermsAndAgreements } from '@library/yup-validate';

import { DROPDOWN_OPTIONS } from './mock';
import { REGEX } from '@library/constants';

const shape = object({
  selected_type: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  phone: string().when('selected_type', {
    is: DROPDOWN_OPTIONS[0].value,
    then: schema => yupPhoneValidationWithSchema(schema),
    otherwise: schema => schema.notRequired(),
  }),
  email: string().when('selected_type', {
    is: DROPDOWN_OPTIONS[1].value,
    then: schema =>
      schema
        .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }))
        .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    otherwise: schema => schema.notRequired(),
  }),
  ...yupTermsAndAgreements,
});

const forgot_password_form_schema = yupResolver(shape);

type ForgotPasswordFormFields = InferType<typeof shape>;

export { forgot_password_form_schema, type ForgotPasswordFormFields };
