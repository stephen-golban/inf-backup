import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useExecutePaymentService } from '@services/execute-payment';

import type { SelectedCardParams } from '@typings/responses';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';
import { useLastInquiryService } from '@services/last-inquiry';
import { setAppSubscription } from '@store/app';

type Props = {
  onSuccess?: () => void;
  retentionOffer?: boolean;
  selectedPlan: SelectedPlan | undefined;
};

function usePurchaseSubscriptionService({ selectedPlan, retentionOffer = false, onSuccess }: Props) {
  const toast = useToast();
  const paymentService = useExecutePaymentService(false);
  const { fetchInquiryReport, loadingInquiry } = useLastInquiryService();

  const [purchaseSubscription, { loading: loadingPurchase }] = useLazyAxios<string>('/subscription-management/purchase', {
    method: 'post',
  });

  const onPaySuccess = useTryCatch(async (params: { payId: string; orderId: string }, automaticTermExtension: boolean) => {
    if (selectedPlan) {
      const body = {
        retentionOffer,
        automaticTermExtension,
        reservedSubscriptionId: null,
        transactionId: params.orderId,
        subscriptionId: selectedPlan.id,
        annualPayment: selectedPlan.isAnnual,
      };

      await purchaseSubscription(body, async response => {
        if (response) {
          onSuccess?.();
          await fetchInquiryReport();
          await setAppSubscription(response as any); // temporary type. Will check with backend
          toast.show(response, { type: 'success' });
        }
      });
    }
  });

  const onCardSelected = async ({ billerId, cardId, automaticTermExtension }: SelectedCardParams) => {
    if (selectedPlan) {
      return await paymentService.onPressPay(
        { purchasedServiceName: 'SUBSCRIPTION', amount: selectedPlan.price, billerId, cardId },
        params => onPaySuccess(params, automaticTermExtension),
      );
    }
  };

  const loadingPayment = paymentService.loading || loadingInquiry;

  return {
    loadingPayment,
    loadingPurchase,
    onCardSelected,
  };
}

export { usePurchaseSubscriptionService };
