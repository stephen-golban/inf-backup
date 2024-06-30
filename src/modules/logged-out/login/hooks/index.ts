const DEFAULT_VALUES = {
  phone: '',
  password: '',
  terms_conditions_agreement: false,
  credit_history_report_agreement: false,
};

export default function useLoginModule() {
  return { DEFAULT_VALUES };
}
