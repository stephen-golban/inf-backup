import { translate } from '@translations/translate';

export const SERVICE_TYPE_MOCK = [
  {
    label: translate('logged_in:payment:credit_report_order:credit_report'),
    value: 'CLIENT_REQUEST',
  },
  {
    label: translate('logged_in:payment:credit_report_order:credit_report_summary'),
    value: 'CREDIT_REPORT_SUMMARY',
  },
  {
    label: translate('logged_in:payment:credit_report_order:own_data_checks'),
    value: 'OWN_DATA_CHECKS',
  },
  {
    label: translate('logged_in:payment:credit_report_order:credit_report_events'),
    value: 'CREDIT_REPORT_EVENTS',
  },
  {
    label: translate('logged_in:payment:credit_report_order:credit_report_quality'),
    value: 'CREDIT_REPORT_QUALITY',
  },
  {
    label: translate('logged_in:payment:credit_report_order:credit_score'),
    value: 'CREDIT_SCORE',
  },
  {
    label: translate('logged_in:payment:credit_report_order:subscription'),
    value: 'SUBSCRIPTION',
  },
];
