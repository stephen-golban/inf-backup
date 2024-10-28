import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string } from 'yup';

import { REGEX } from '@library/constants';

const createShape = (type: 'PHONE' | 'EMAIL') => {
  if (type === 'EMAIL') {
    return object({
      email: string()
        .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }))
        .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    });
  } else {
    return object({
      phone: string()
        .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
        .min(8, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 8 } })),
    });
  }
};

const phoneOrEmail_form_schema = (type: 'PHONE' | 'EMAIL') => yupResolver(createShape(type) as any);

type PhoneOrEmailFormFields = InferType<ReturnType<typeof createShape>>;

export { phoneOrEmail_form_schema, type PhoneOrEmailFormFields };
