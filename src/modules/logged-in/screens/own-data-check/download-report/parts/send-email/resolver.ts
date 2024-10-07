import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { boolean, type InferType, object, string } from 'yup';
import { REGEX } from '@library/constants';

const shape = object({
  sendEmail: boolean()
    .oneOf([false, true], stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  email: string().when('sendEmail', ([sendEmail]) => {
    if (sendEmail) {
      return string()
        .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
        .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }));
    }
    return string().notRequired();
  }),
});

const email_send_schema = yupResolver(shape);

type EmailSendFormFields = InferType<typeof shape>;

export { email_send_schema, type EmailSendFormFields };
