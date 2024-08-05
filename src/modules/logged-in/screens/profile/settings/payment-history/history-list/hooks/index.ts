import { useLazyAxios } from '@api/hooks';
import { openBrowserAsync } from '@library/method';

import type { RegisterCardApiResponse } from '@typings/responses';

export default function useHistoryList() {
  //   const [purchase] = useLazyAxios('/payment-purchases', { method: 'post' });
  const [registerCard, { loading }] = useLazyAxios<RegisterCardApiResponse>('/bank-card-accounts', { method: 'post' });

  async function handlePaymentExecution() {
    // await call({
    //   paymentServiceName: 'MAIB',
    //   paymentType: 'DIRECT',
    //   purchasedServiceName: 'CREDIT_REPORT',
    //   billerId: '5102180060101124',
    //   amount: 0,
    //   currency: 'MDL',
    //   clientIp: '127.0.0.1',
    // });
    await registerCard(
      {
        billerExpiry: '0628',
        clientIp: '127.0.0.1',
        currency: 'MDL',
        purchasedServiceName: 'CREDIT_REPORT',
        cardType: 'RECURRING',
        amount: 0,
      },
      ({ result }) => openBrowserAsync(result.payUrl),
    );
  }

  return { loading, handlePaymentExecution };
}
