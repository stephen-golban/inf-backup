import { useRef } from 'react';
import { useTryCatch } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useRegisterCardService } from '@services/register-card';

import type { GetAllCardsApiResponse } from '@typings/responses';

function usePaymentCardsService() {
  const stackRef = useRef<any>(null);
  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();

  const cards = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });
  const [remove, { loading: loadingDelete }] = useLazyAxios<number>('/bank-card-accounts', { method: 'delete' });

  const onDeleteCallback = useTryCatch(async (res: number) => {
    if (res === 204) {
      stackRef.current?.swipe(-1);
      return await cards.refetch();
    }
    return;
  });

  const onDeleteCard = useTryCatch(async (id: number) => {
    if (cards.data && cards.data.length > 1) {
      await remove(undefined, onDeleteCallback, { additionalUrl: `/${id}` });
    }
  });

  return { stackRef, cards, loadingRegister, callbackLoading, loadingDelete, onRegisterCard, onDeleteCard };
}

export { usePaymentCardsService };
