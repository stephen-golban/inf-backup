import React from 'react';

import { useErrorMessageTranslation } from '@library/hooks';
import { Controller, Path, RegisterOptions, useFormContext } from 'react-hook-form';

import { HelperText } from '@components/ui';
import { TextInput, type TextInputProps } from '../text-input';

interface IFormInput<T extends Record<string, any>> extends TextInputProps, React.RefAttributes<any> {
  name: Path<T>;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

const FormInput = React.forwardRef<any, IFormInput<any>>(({ name, rules, ...rest }, ref) => {
  const { control } = useFormContext<any>();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const message = useErrorMessageTranslation(error?.message);

        return (
          <>
            <TextInput {...field} ref={ref} error={error?.message !== undefined} onChangeText={field.onChange} {...rest} />
            <HelperText visible={message !== undefined} msg={message ?? ''} type={'error'} />
          </>
        );
      }}
    />
  );
});

FormInput.displayName = 'FormInput';

export { FormInput };
