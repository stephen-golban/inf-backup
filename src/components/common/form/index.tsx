import React from 'react';

import { usePrevious } from 'react-use';

import { FormInput } from './form-input';

import { UseFormHandleSubmit, FieldValues, FormProvider, useForm, UseFormReturn, DefaultValues, Resolver } from 'react-hook-form';

interface IFormProps<T extends FieldValues> {
  defaultValues?: DefaultValues<T>;
  resolver?: Resolver<T, any> | undefined;
  children: React.ReactNode | ((args: UseFormReturn<T>) => React.ReactNode);
  onValuesChange?: (values: Partial<T>, setValue: UseFormReturn<T>['setValue']) => void;
}

const Form = <T extends object>(props: IFormProps<T>) => {
  const { children, defaultValues, onValuesChange, resolver } = props;
  const methods = useForm<T>({ defaultValues, resolver, mode: 'all' });
  const { watch } = methods;

  const allValues = watch();
  const prevValues = usePrevious(allValues);

  React.useEffect(() => {
    if (onValuesChange && prevValues) {
      const changedFields = Object.keys(allValues).reduce((acc, key) => {
        if (allValues[key as keyof typeof allValues] !== prevValues[key as keyof typeof prevValues]) {
          acc[key as keyof typeof acc] = allValues[key as keyof typeof allValues];
        }
        return acc;
      }, {} as Partial<T>);

      if (Object.keys(changedFields).length > 0) {
        onValuesChange(changedFields, methods.setValue);
      }
    }
  }, [allValues, onValuesChange]);
  return <FormProvider<T> {...methods}>{typeof children === 'function' ? children(methods) : children}</FormProvider>;
};

export { Form, FormInput };

export type CreateFormButtonArgs<T extends FieldValues> = {
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
};
