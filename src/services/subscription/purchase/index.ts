import { useLazyAxios } from '@api/hooks';
import { useGetSubscription } from '../get';
import { useTryCatch } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';
import { useToast } from 'react-native-toast-notifications';
import { useLastInquiryService } from '@services/last-inquiry';
import { useExecutePaymentService } from '@services/execute-payment';

import type { CreditReportEventsApiResponse, SelectedCardParams } from '@typings/responses';
import type { SelectedPlan } from '@modules/logged-in/screens/subscriptions/subscriptions/type';

type Props = {
  onSuccess?: () => void;
  retentionOffer?: boolean;
  selectedPlan: SelectedPlan | undefined;
};

function usePurchaseSubscriptionService({ selectedPlan, retentionOffer = false, onSuccess }: Props) {
  const toast = useToast();
  const paymentService = useExecutePaymentService(false);
  const { fetchInquiryReport, loadingInquiry } = useLastInquiryService();

  const { getSubscription, loading: subscriptionLoading } = useGetSubscription(true);

  const [purchaseSubscription, { loading: loadingPurchase }] = useLazyAxios<string>('/subscription-management/purchase', {
    method: 'post',
  });

  const [reportEvents, { loading: loadingReportEvents }] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
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
          await getSubscription();
          await fetchInquiryReport();
          await reportEvents(undefined, res => {
            useAppDataCheckStore.setState({ reportEvents: res });
          });
          onSuccess?.();
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

  const loadingPayment = paymentService.loading || loadingInquiry || loadingReportEvents || subscriptionLoading;

  return {
    loadingPayment,
    loadingPurchase,
    onCardSelected,
  };
}

export { usePurchaseSubscriptionService };
