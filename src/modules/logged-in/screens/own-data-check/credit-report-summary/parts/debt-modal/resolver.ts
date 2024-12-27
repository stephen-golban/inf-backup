import { InferType, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupPhoneValidation } from '@library/yup-validate';

export const DEFAULT_VALUES = {
  phone: '',
};

const shape = object({
  phone: yupPhoneValidation,
});

const debt_modal_phone = yupResolver(shape);

type DebtModalPhone = InferType<typeof shape>;

export { debt_modal_phone, type DebtModalPhone };
