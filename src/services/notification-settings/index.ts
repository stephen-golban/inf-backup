import { noop } from 'lodash';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import type { Noop } from 'react-hook-form';

function useNotificationSettingsService(onSuccess: Noop = noop) {
  const [call, { loading, data }] = useLazyAxios('/notifications/settings', { method: 'post' });

  const onRequestSuccess = (res: any) => {
    onSuccess();
  };

  const save = useTryCatch(async (type: 'EMAIL' | 'PHONE', value: string) => {
    const body = {
      type,
      value,
      invoiceDisplay: true,
      invoiceSending: true,
      informationSending: true,
      credentialsSending: false,
    };

    await call(body, onRequestSuccess);
  });

  return { save, loading, data };
}

export { useNotificationSettingsService };
