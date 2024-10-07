import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { boolean, string, object, type InferType } from 'yup';

const shape = object({
  originalStampedReport: boolean().notRequired(),
  translatedApostilledReport: boolean().notRequired(),
  originalTranslatedReport: boolean().notRequired(),

  phone: object({
    label: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
    value: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  }).required(stringifyObjectValidate({ keyT: 'validation:field_required' })),

  termsAgreement: boolean()
    .oneOf([false, true], stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const report_request_schema = yupResolver(shape);

type ReportRequestFormFields = InferType<typeof shape>;

export { report_request_schema, type ReportRequestFormFields };
