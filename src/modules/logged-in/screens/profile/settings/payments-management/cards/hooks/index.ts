import { useRef } from 'react';
import { useTryCatch } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useRegisterCardService } from '@services/register-card';

import type { GetAllCardsApiResponse } from '@typings/responses';

export default function useCardsManagement() {
  const stackRef = useRef<any>(null);
  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();

  const cards = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });
  const [remove, { loading: loadingDelete }] = useLazyAxios('/bank-card-accounts', { method: 'delete' });

  const onDeleteCallback = useTryCatch(async () => {
    stackRef.current?.swipe(-1);
    await cards.refetch();
  });

  const onDeleteCard = useTryCatch(async (id: number) => {
    await remove(undefined, onDeleteCallback, { additionalUrl: `/${id}` });
  });

  return { stackRef, cards, loadingRegister, callbackLoading, loadingDelete, onRegisterCard, onDeleteCard };
}
