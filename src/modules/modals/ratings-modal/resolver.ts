import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';
import { type InferType, object, string, number } from 'yup';

const shape = object({
  comment: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
  rating: number()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(1, stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const ratings_form_schema = yupResolver(shape);

type RatingsFormFields = InferType<typeof shape>;

export { ratings_form_schema, type RatingsFormFields };
