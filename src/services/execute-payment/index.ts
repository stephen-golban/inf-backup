import { noop } from 'lodash';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { createPaymentBody } from './util';
import { useTryCatch } from '@library/hooks';
import { getQueryParams, openBrowserAuthAsync } from '@library/method';
import { useCreateCreditReportService } from '@services/use-create-credit-report';

import type { ExecutePaymentApiResponse, ExecutePaymentBodyArgs } from '@typings/responses';
import type { CreditReportOrderFormFields } from '@modules/logged-in/screens/payment/order/resolver';

type Props = {
  billerId: string;
  onFail?: () => void;
};
type OnSuccess = (params: { payId: string; orderId: string }) => Promise<void>;

function useExecutePaymentService({ billerId, onFail }: Props) {
  const user = useAppStore(state => state.user);
  const emails = user?.contactData.filter(item => item.type === 'EMAIL').map(item => item.value);

  const { onCreateCreditReport, loading: createReportLoading } = useCreateCreditReportService();
  const [callback, callbackUtils] = useLazyAxios('/payment-purchases/call-back-payment', { method: 'get' });
  const [initiatePayment, initiatePaymentUtils] = useLazyAxios<ExecutePaymentApiResponse>('/payment-purchases', { method: 'post' });

  const onSuccessfulCallback = useTryCatch(async (params: { payId: string; orderId: string }, input: CreditReportOrderFormFields) => {
    const body = {
      ...input,
      emails: emails?.join(','),
      language: input.language.toUpperCase(),
    };

    return await onCreateCreditReport(body, params.orderId);

    // toast.show(t('profile:settings:payment_history_screen:successfully_registered_new_card'), { type: 'success' });
  });

  const onPaymentFailure = useTryCatch(() => {
    callbackUtils.cancel();
    initiatePaymentUtils.cancel();
    onFail?.();
  });

  const onPressPayCallback = useTryCatch(async ({ result }: ExecutePaymentApiResponse, onSuccess: OnSuccess) => {
    const response = await openBrowserAuthAsync(result.payUrl, 'infodebit://payment-purchases/call-back-payment');

    if (response && response.type === 'success') {
      const params = getQueryParams<{ payId: string; orderId: string }>(response.url);
      await callback(undefined, noop, { params });
      return await onSuccess(params);
    }
    return onPaymentFailure();
  });

  const onPressPay = useTryCatch(async (bodyArgs: Omit<ExecutePaymentBodyArgs, 'billerId'>, onSuccess: OnSuccess) => {
    const body = createPaymentBody({ ...bodyArgs, billerId });
    return await initiatePayment(body, res => onPressPayCallback(res, onSuccess));
  });

  const loading = initiatePaymentUtils.loading || createReportLoading;

  return { loading, onPressPay };
}

export { useExecutePaymentService };
