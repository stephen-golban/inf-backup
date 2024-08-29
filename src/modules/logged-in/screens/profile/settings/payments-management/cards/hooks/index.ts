import { useRef } from 'react';
import { useAxios, useLazyAxios } from '@api/hooks';
import { openBrowserAuthAsync } from '@library/method';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';
import { createCardRegistrationBody, getQueryParams } from './util';

import type { GetAllCardsApiResponse, RegisterCardApiResponse } from '@typings/responses';

export default function useCardsManagement() {
  const toast = useToast();
  const { t } = useTranslation();
  const stackRef = useRef<any>(null);

  const cards = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });
  const [remove, { loading: loadingDelete }] = useLazyAxios('/bank-card-accounts', { method: 'delete' });
  const [register, { loading: loadingRegister }] = useLazyAxios<RegisterCardApiResponse>('/bank-card-accounts', { method: 'post' });
  const [callback, { loading: callbackLoading }] = useLazyAxios('/bank-card-accounts/call-back-registration', { method: 'get' });

  const onDeleteCallback = useTryCatch(async () => {
    stackRef.current?.swipe(-1);
    await cards.refetch();
  });

  const onDeleteCard = useTryCatch(async (id: number) => {
    await remove(undefined, onDeleteCallback, { additionalUrl: `/${id}` });
  });

  const onSuccessfulCallback = useTryCatch(async () => {
    await cards.refetch();
    toast.show(t('profile:settings:payment_history_screen:successfully_registered_new_card'), { type: 'success' });
  });

  const onRegisterCallback = useTryCatch(async ({ result }: RegisterCardApiResponse) => {
    const response = await openBrowserAuthAsync(result.payUrl, 'infodebit://payment-purchases/call-back-payment');
    if (response && response.type === 'success') {
      const params = getQueryParams<{ payId: string; billerId: string }>(response.url);
      return await callback(undefined, onSuccessfulCallback, { params });
    }
  });

  const onRegisterCard = useTryCatch(async () => {
    const body = createCardRegistrationBody();
    return await register(body, onRegisterCallback);
  });

  return { stackRef, cards, loadingRegister, callbackLoading, loadingDelete, onRegisterCard, onDeleteCard };
}
