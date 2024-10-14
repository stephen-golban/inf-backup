import { inRange } from 'lodash';
import { useRef, useState } from 'react';
import { useTryCatch } from '@library/hooks';
import { useTranslation } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useRegisterCardService } from '@services/register-card';

import type { GetAllCardsApiResponse } from '@typings/responses';

function useCreditCardService() {
  const toast = useToast();
  const { t } = useTranslation();

  const stackRef = useRef<any>(null);
  const [currentCard, setCurrentCard] = useState<GetAllCardsApiResponse[number]>();
  const [automaticTermExtension, setAutomaticTermExtension] = useState<boolean>(true);
  const { callbackLoading, loadingRegister, onRegisterCard } = useRegisterCardService();

  const cards = useAxios<GetAllCardsApiResponse>('/bank-card-accounts', { method: 'get' });
  const [remove, { loading: loadingDelete }] = useLazyAxios<number>('/bank-card-accounts', { method: 'delete' });

  const onDeleteCallback = useTryCatch(async (res: number) => {
    if (inRange(res, 200, 299)) {
      stackRef.current?.swipe(-1);
      toast.show(t('ui:toasts:credit_card_deleted'), { type: 'success' });
      return await cards.refetch();
    }
    return;
  });

  const onDeleteCard = useTryCatch(async (id: number) => {
    await remove(undefined, onDeleteCallback, { additionalUrl: `/${id}` });
  });

  const onPressRegisterCard = async () => await onRegisterCard(cards.refetch);

  const isRegistering = loadingRegister || callbackLoading;

  return {
    cards,
    stackRef,
    currentCard,
    loadingDelete,
    isRegistering,
    automaticTermExtension,
    functions: {
      onDeleteCard,
      setCurrentCard,
      onPressRegisterCard,
      setAutomaticTermExtension,
    },
  };
}

export { useCreditCardService };
