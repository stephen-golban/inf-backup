import { useAxios } from '@api/hooks';

import type { AllPaymentsApiResponse } from '@typings/responses';

export default function usePaymentHistory() {
  const cards = useAxios<any>('/bank-card-accounts', { method: 'get' });
  const history = useAxios<AllPaymentsApiResponse>('/payment-purchases', { method: 'get' });

  const refetch = async () => {
    await cards.refetch();
    await history.refetch();
  };

  const loading = cards.loading || history.loading;

  return {
    loading,
    refetch,
    cards: cards.data,
    history: history.data,
  };
}
