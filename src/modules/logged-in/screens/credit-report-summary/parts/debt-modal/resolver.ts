import { InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

export const DEFAULT_VALUES = {
  phone: '',
};

const shape = object({
  phone: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(8, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 8 } })),
});

const debt_modal_phone = yupResolver(shape);

type DebtModalPhone = InferType<typeof shape>;

export { debt_modal_phone, type DebtModalPhone };
