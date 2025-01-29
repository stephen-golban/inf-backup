import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string, date } from 'yup';

import { REGEX } from '@library/constants';
import { yupPhoneValidation, yupTermsAndAgreements } from '@library/yup-validate';

const IDNP_REGEX = /^((2\d{12})|(09\d{11}))$/;

const shape = object({
  email: string()
    .matches(REGEX.email, stringifyObjectValidate({ keyT: 'validation:email_valid_address' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),

  birthDate: date(),

  identityNumber: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .matches(/^[0-9]{13}$/, stringifyObjectValidate({ keyT: 'validation:idnp_invalid' }))
    .test('is-valid-idnp', stringifyObjectValidate({ keyT: 'validation:idnp_invalid' }), value => {
      if (!value) return false;

      const validate = (value: string) => {
        if (!IDNP_REGEX.test(value)) {
          return false;
        }

        const crc = value
          .substring(0, 12)
          .split('')
          .reduce((acc, char, i) => acc + Number(char) * (i % 3 === 0 ? 7 : i % 3 === 1 ? 3 : 1), 0);

        return Number(value[12]) === crc % 10;
      };

      return validate(value);
    }),

  firstName: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .matches(/^[A-Z][a-z]+(?:(?:\s|-)[A-Z](?:[a-z]+)?)*$/, stringifyObjectValidate({ keyT: 'validation:invalid_format' }))
    .min(3, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 3 } })),

  lastName: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .matches(/^[A-Z][a-z]+(?:(?:\s|-)[A-Z](?:[a-z]+)?)*$/, stringifyObjectValidate({ keyT: 'validation:invalid_format' }))
    .min(3, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 3 } })),

  promoCode: string()
    .notRequired()
    .matches(/^[A-Z0-9]{13}$/, {
      message: stringifyObjectValidate({ keyT: 'validation:invalid_format' }),
      excludeEmptyString: true,
    })
    .matches(/[0-9]/, {
      message: stringifyObjectValidate({ keyT: 'validation:invalid_format' }),
      excludeEmptyString: true,
    }),

  phone: yupPhoneValidation,
  ...yupTermsAndAgreements,
});

const register_form_schema = yupResolver(shape);

type RegisterFormFields = InferType<typeof shape>;

export { register_form_schema, type RegisterFormFields };
