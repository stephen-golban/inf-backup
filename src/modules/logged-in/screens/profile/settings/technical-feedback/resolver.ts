import { type InferType, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

const shape = object({
  message: string().required(stringifyObjectValidate({ keyT: 'validation:field_required' })),
});

const settings_feedback_form_schema = yupResolver(shape);

type SettingFeedbackFormFields = InferType<typeof shape>;

export { settings_feedback_form_schema, type SettingFeedbackFormFields };
