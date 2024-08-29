import { useState } from 'react';
import { useLazyAxios } from '@api/hooks';
import { createPaymentBody } from './util';
import { useTryCatch, useTryCatchWithCallback } from '@library/hooks';

import type { ExecutePaymentApiResponse, ExecutePaymentBodyArgs } from '@typings/responses';

function useExecutePaymentService() {
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [billerId, setBillerId] = useState<string | null>(null);

  const [initiatePayment, initiatePaymentUtils] = useLazyAxios<ExecutePaymentApiResponse>('/payment-purchases', { method: 'post' });

  const onPaymentSuccess = useTryCatch(async (payId: string, orderId: string) => {});

  const onPaymentFailure = useTryCatch(() => {
    setPayUrl(null);
    initiatePaymentUtils.cancel();
  });

  const onPressPay = useTryCatchWithCallback(
    async (args: Omit<ExecutePaymentBodyArgs, 'billerId'>) => {
      if (billerId) {
        const body = createPaymentBody({ ...args, billerId });

        await initiatePayment(body, async ({ result }) => {
          setPayUrl(result.payUrl);
        });
      }
    },
    [billerId],
  );

  const loading = initiatePaymentUtils.loading;

  return { loading, onPressPay, payUrl, onPaymentFailure, onPaymentSuccess, setBillerId };
}

export { useExecutePaymentService };
