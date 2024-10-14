import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { boolean, type InferType, object, string } from 'yup';

const shape = object({
  sendEmail: boolean(),
  email: object({
    label: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    value: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  }).required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const email_send_schema = yupResolver(shape);

type EmailSendFormFields = InferType<typeof shape>;

export { email_send_schema, type EmailSendFormFields };
