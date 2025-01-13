import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useLastInquiryService } from '@services/last-inquiry';

import { createPaymentBody } from './util';

import type { ExecutePaymentApiResponse, ExecutePaymentBodyArgs } from '@typings/responses';

type OnSuccess = (params: { payId: string; orderId: string; status?: string; payUrl?: string }) => Promise<void>;

function useExecutePaymentService(refreshInquiryReport = true) {
  const { fetchInquiryReport, loadingInquiry } = useLastInquiryService();
  const [initiatePayment, initiatePaymentUtils] = useLazyAxios<ExecutePaymentApiResponse>('/payment-purchases', { method: 'post' });

  const onPaymentFailure = useTryCatch(() => {
    initiatePaymentUtils.cancel();
  });

  const onPressPayCallback = useTryCatch(async ({ result, ok }: ExecutePaymentApiResponse, onSuccess: OnSuccess) => {
    if (ok) {
      onSuccess({ payId: result.payId, orderId: result.orderId, payUrl: result?.payUrl || '' });
      if (refreshInquiryReport) {
        await fetchInquiryReport();
      }
      return;
    }
    return onPaymentFailure();
  });

  const onPressPay = useTryCatch(async (bodyArgs: ExecutePaymentBodyArgs, onSuccess: OnSuccess) => {
    const body = createPaymentBody(bodyArgs);
    return await initiatePayment(body, res => onPressPayCallback(res, onSuccess));
  });

  const loading = initiatePaymentUtils.loading || (refreshInquiryReport && loadingInquiry);

  return { loading, onPressPay };
}

export { useExecutePaymentService };
