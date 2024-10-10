import { noop } from 'lodash';
import { useLazyAxios } from '@api/hooks';
import { createPaymentBody } from './util';
import { useTryCatch } from '@library/hooks';
import { closeInAppBrowser, getQueryParams, openBrowserAuthAsync } from '@library/method';

import type { ExecutePaymentApiResponse, ExecutePaymentBodyArgs } from '@typings/responses';

type OnSuccess = (params: { payId: string; orderId: string; status?: string }) => Promise<void>;

function useExecutePaymentService() {
  const [callback, callbackUtils] = useLazyAxios('/payment-purchases/call-back-payment', { method: 'get' });
  const [initiatePayment, initiatePaymentUtils] = useLazyAxios<ExecutePaymentApiResponse>('/payment-purchases', { method: 'post' });

  const onPaymentFailure = useTryCatch(() => {
    callbackUtils.cancel();
    initiatePaymentUtils.cancel();
  });

  const onPressPayCallback = useTryCatch(async ({ result, ok }: ExecutePaymentApiResponse, onSuccess: OnSuccess) => {
    if (ok) {
      return onSuccess({ payId: result.payId, orderId: result.orderId });
    }
    return onPaymentFailure();
    // const response = await openBrowserAuthAsync(result.payUrl, 'infodebit://payment-purchases/call-back-payment');

    // if (response) {
    //   if (response.type === 'success') {
    //     const params = getQueryParams<{ payId: string; orderId: string }>(response.url);
    //     await callback(undefined, noop, { params });
    //     return await onSuccess(params);
    //   }
    //   closeInAppBrowser();
    //   return onPaymentFailure();
    // }
    // closeInAppBrowser();
    // return onPaymentFailure();
  });

  const onPressPay = useTryCatch(async (bodyArgs: ExecutePaymentBodyArgs, onSuccess: OnSuccess) => {
    const body = createPaymentBody(bodyArgs);
    return await initiatePayment(body, res => onPressPayCallback(res, onSuccess));
  });

  const loading = initiatePaymentUtils.loading || callbackUtils.loading;

  return { loading, onPressPay };
}

export { useExecutePaymentService };
