import React from 'react';

import { useTranslation } from '@library/hooks';

import { FilledButton, Form, FormInput, Screen, View } from '@components/common';
import { type SettingFeedbackFormFields, settings_feedback_form_schema } from './resolver';

interface ITechnicalFeedbackModule {
  loading?: boolean;
  onSubmit(args: SettingFeedbackFormFields): Promise<void>;
}

const TechnicalFeedbackModule: React.FC<ITechnicalFeedbackModule> = ({ onSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <Screen unsafe p="lg" pb="xl">
      <Form resolver={settings_feedback_form_schema} defaultValues={{ message: '' }}>
        {({ handleSubmit, formState, reset }) => {
          const customSubmit = async (input: SettingFeedbackFormFields) => {
            await onSubmit(input).then(() => reset());
          };
          return (
            <View fill between>
              <View>
                <FormInput
                  required
                  multiline
                  name="message"
                  maxLength={255}
                  style={{ borderRadius: 8 }}
                  label={t('profile:settings:feedback:message')}
                  placeholderI18n="profile:settings:feedback:placeholder"
                />
                <FilledButton
                  my="lg"
                  onPress={handleSubmit(customSubmit)}
                  loading={loading}
                  t18n="ui:submit"
                  disabled={!formState.isValid}
                />
              </View>
            </View>
          );
        }}
      </Form>
    </Screen>
  );
};

export { TechnicalFeedbackModule, type SettingFeedbackFormFields };
