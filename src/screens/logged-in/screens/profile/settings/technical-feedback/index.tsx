import React from 'react';

import { useLazyAxios } from '@api/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';

import { type SettingFeedbackFormFields, TechnicalFeedbackModule } from '@modules/logged-in';

import { type SettingsStackScreenProps, SETTINGS_SCREENS } from '@typings/navigation';

const TechnicalFeedback: React.FC<SettingsStackScreenProps<SETTINGS_SCREENS.TECHNICAL_FEEDBACK>> = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const [call, { loading }] = useLazyAxios('feedback?type=TECHNICAL_ERROR', { method: 'post' });

  const onSubmit = useTryCatch(async (body: SettingFeedbackFormFields) => {
    await call(body, () => toast.show(t('ui:success'), { type: 'success' }));
  });

  return <TechnicalFeedbackModule onSubmit={onSubmit} loading={loading} />;
};

export { TechnicalFeedback };
