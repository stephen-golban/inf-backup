import { useAppStore } from '@store/app';
import { useTryCatch } from '@library/hooks';
import { useCreateCreditReportService } from '@services/use-create-credit-report';

import type { CreditReportOrderFormFields } from '@modules/logged-in/screens/payment/order/resolver';

export default function usePaymentOrderScreen() {
  const user = useAppStore(state => state.user);
  const emails = user?.contactData.filter(item => item.type === 'EMAIL').map(item => item.value);

  const { onCreateCreditReport, loading } = useCreateCreditReportService();

  const onSuccess = useTryCatch(async (params: { payId: string; orderId: string }, input: CreditReportOrderFormFields) => {
    const body = {
      ...input,
      emails: emails?.join(','),
      language: input.language.toUpperCase(),
    };
    return await onCreateCreditReport(body, params.orderId);
  });

  return { onSuccess, createReportLoading: loading };
}
