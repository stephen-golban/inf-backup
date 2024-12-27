import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string } from 'yup';

import { REGEX } from '@library/constants';
import { yupPhoneValidation } from '@library/yup-validate';

const createShape = (type: 'PHONE' | 'EMAIL') => {
  if (type === 'EMAIL') {
    return object({
      email: string()
        .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }))
        .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    });
  } else {
    return object({
      phone: yupPhoneValidation,
    });
  }
};

const phoneOrEmail_form_schema = (type: 'PHONE' | 'EMAIL') => yupResolver(createShape(type) as any);

type PhoneOrEmailFormFields = InferType<ReturnType<typeof createShape>>;

export { phoneOrEmail_form_schema, type PhoneOrEmailFormFields };
