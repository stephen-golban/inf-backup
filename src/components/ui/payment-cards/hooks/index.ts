import { useRef } from 'react';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useRegisterCardService } from '@services/register-card';

import type { BaseAxiosProps } from '@api/hooks/type';
import type { GetAllCardsApiResponse } from '@typings/responses';

export default function usePaymentCards(cards: BaseAxiosProps<GetAllCardsApiResponse>) {
  const stackRef = useRef<any>(null);

  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();

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
