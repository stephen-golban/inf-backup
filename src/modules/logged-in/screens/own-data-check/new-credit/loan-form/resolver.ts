import { object, number, string, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

const loanFormSchema = object({
  sliderValue: number()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(5000, stringifyObjectValidate({ keyT: 'validation:min_value', options: { min: 5000 } })),
  term: object({
    label: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    value: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  }).required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  phone: object({
    label: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    value: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  }).required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const loan_form_resolver = yupResolver(loanFormSchema);

export type LoanFormFields = InferType<typeof loanFormSchema>;

export { loan_form_resolver };
