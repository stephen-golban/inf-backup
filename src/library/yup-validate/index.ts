import { REGEX } from '@library/constants';
import { stringifyObjectValidate } from '@library/string';
import { boolean, Schema, string } from 'yup';
import { usePhoneNumberInputStore } from '@store/phone-number-input';

export const yupTermsAndAgreements = {
  terms_conditions_agreement: boolean()
    .oneOf([true], stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
};

export const yupPasswordValidation = string()
  .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
  .min(6, stringifyObjectValidate({ keyT: 'validation:password:length_error' }))
  .test('uppercase', stringifyObjectValidate({ keyT: 'validation:password:uppercase_error' }), value =>
    REGEX.uppercase.test(value as string),
  )
  .test('number', stringifyObjectValidate({ keyT: 'validation:password:number_error' }), value => REGEX.number.test(value as string))
  .test('special-character', stringifyObjectValidate({ keyT: 'validation:password:special_character_error' }), value =>
    REGEX.special_character.test(value as string),
  );

export const yupPhoneValidation = string()
  .test('phone-format', '', function (value) {
    // Skip if empty (let required handle it)
    if (!value) return true;

    const { minLength, displayLength } = usePhoneNumberInputStore.getState();

    // Check if the number meets minimum length requirements
    if (value.length < minLength) {
      return this.createError({
        message: stringifyObjectValidate({
          keyT: 'validation:min_chars_length',
          options: { count: displayLength },
        }),
      });
    }

    return true;
  })
  .required(stringifyObjectValidate({ keyT: 'validation:field_required' }));

export const yupPhoneValidationWithSchema = (schema: Schema) =>
  schema
    .test('phone-format', '', function (value) {
      // Skip if empty (let required handle it)
      if (!value) return true;

      const { minLength, displayLength } = usePhoneNumberInputStore.getState();

      // Check if the number meets minimum length requirements
      console.log(value.length, minLength);
      if (value.length < minLength) {
        return this.createError({
          message: stringifyObjectValidate({
            keyT: 'validation:min_chars_length',
            options: { count: displayLength },
          }),
        });
      }

      return true;
    })
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }));
