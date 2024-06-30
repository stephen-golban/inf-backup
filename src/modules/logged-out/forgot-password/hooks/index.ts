import { DROPDOWN_OPTIONS } from '../mock';
import { ForgotPasswordFormFields } from '../resolver';

const DEFAULT_VALUES: ForgotPasswordFormFields = {
  email: undefined,
  phone: undefined,
  selected_type: DROPDOWN_OPTIONS[0].value,
  terms_conditions_agreement: false,
  credit_history_report_agreement: false,
};

const getOption = (value: string) => DROPDOWN_OPTIONS.find(item => item.value === value);

export default function useLoginModule() {
  return { DEFAULT_VALUES, getOption };
}
