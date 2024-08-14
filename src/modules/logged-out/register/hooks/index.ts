import { subYears } from 'date-fns';
import { RegisterFormFields } from '../resolver';

const DEFAULT_VALUES: RegisterFormFields = {
  identityNumber: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: subYears(new Date(), 18),
  terms_conditions_agreement: false,
  credit_history_report_agreement: false,
  promoCode: '',
};

export default function useRegisterModule() {
  return { DEFAULT_VALUES };
}
