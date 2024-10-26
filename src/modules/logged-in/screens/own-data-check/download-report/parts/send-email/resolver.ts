import { yupResolver } from '@hookform/resolvers/yup';
import { REGEX } from '@library/constants';
import { stringifyObjectValidate } from '@library/string';

import { boolean, type InferType, object, string } from 'yup';

const shape = object({
  sendEmail: boolean(),
  email: object({
    label: string()
      .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
      .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' })),
    value: string()
      .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
      .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' })),
  }).required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const email_send_schema = yupResolver(shape);

type EmailSendFormFields = InferType<typeof shape>;

export { email_send_schema, type EmailSendFormFields };
