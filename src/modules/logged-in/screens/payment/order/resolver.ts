import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { boolean, type InferType, object, string } from 'yup';

const shape = object({
  language: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  credit_bureau: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  internServiceType: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  sendEmail: boolean()
    .oneOf([false, true], stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const credit_report_order_form_schema = yupResolver(shape);

type CreditReportOrderFormFields = InferType<typeof shape>;

export { credit_report_order_form_schema, type CreditReportOrderFormFields };
