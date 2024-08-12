import { useLazyAxios } from '@api/hooks';
import { openBrowserAsync } from '@library/method';

import type { RegisterCardApiResponse } from '@typings/responses';

export default function useHistoryList() {
  const [registerCard, { loading }] = useLazyAxios<RegisterCardApiResponse>('/bank-card-accounts', { method: 'post' });

  async function handlePaymentExecution() {
    await registerCard(
      {
        billerExpiry: '0629',
        clientIp: '127.0.0.1',
        currency: 'MDL',
        cardType: 'RECURRING',
      },
      ({ result }) => openBrowserAsync(result.payUrl),
    );
  }

  return { loading, handlePaymentExecution };
}
