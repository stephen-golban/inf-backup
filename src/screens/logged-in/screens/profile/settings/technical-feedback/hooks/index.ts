import { useLazyAxios } from '@api/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useDeviceInfoService } from '@services/device-info';
import { useTranslation, useTryCatch } from '@library/hooks';

import type { SettingFeedbackFormFields } from '@modules/logged-in';

export default function useTechnicalFeedbackScreen() {
  const toast = useToast();
  const { t } = useTranslation();
  const { deviceInfo } = useDeviceInfoService();

  const [call, { loading }] = useLazyAxios('feedback?type=TECHNICAL_ERROR', { method: 'post' });

  const deviceInfoString = JSON.stringify(deviceInfo, null, 2);

  const onSubmit = useTryCatch(async (input: SettingFeedbackFormFields) => {
    const body = { message: `${deviceInfoString} ${input.message}` };
    await call(body).then(() => toast.show(t('ui:success'), { type: 'success' }));
  });

  return {
    onSubmit,
    loading,
  };
}
