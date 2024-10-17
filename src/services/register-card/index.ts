import { useLazyAxios } from '@api/hooks';
import { closeInAppBrowser, openBrowserAuthAsync } from '@library/method';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';
import { createCardRegistrationBody, getQueryParams } from './util';

import type { RegisterCardApiResponse } from '@typings/responses';

function useRegisterCardService() {
  const toast = useToast();
  const { t } = useTranslation();

  const [register, { loading: loadingRegister }] = useLazyAxios<RegisterCardApiResponse>('/bank-card-accounts', { method: 'post' });
  const [callback, { loading: callbackLoading }] = useLazyAxios('/bank-card-accounts/call-back-registration', { method: 'get' });

  const onSuccessfulCallback = useTryCatch(async (cb?: () => Promise<void>) => {
    closeInAppBrowser();
    await cb?.();
    toast.show(t('profile:settings:payment_history_screen:successfully_registered_new_card'), { type: 'success' });
  });

  const onRegisterCallback = useTryCatch(async ({ result }: RegisterCardApiResponse, cb?: () => Promise<void>) => {
    const response = await openBrowserAuthAsync(result.payUrl, '');
    if (response && response.type === 'success') {
      const params = getQueryParams<{ payId: string; billerId: string }>(response.url);
      return await callback(undefined, () => onSuccessfulCallback(cb), { params });
    }
  });

  const onRegisterCard = useTryCatch(async (cb?: () => Promise<void>) => {
    const body = createCardRegistrationBody();
    return await register(body, res => onRegisterCallback(res, cb));
  });

  return { loadingRegister, callbackLoading, onRegisterCard };
}

export { useRegisterCardService };
