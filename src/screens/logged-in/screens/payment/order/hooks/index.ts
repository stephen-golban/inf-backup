import { useTryCatch } from '@library/hooks';
import { useCreateCreditReportService } from '@services/use-create-credit-report';

import type { CreditReportOrderFormFields } from '@modules/logged-in/screens/payment/order/resolver';

export default function usePaymentOrderScreen() {
  const { onCreateCreditReport, loading } = useCreateCreditReportService();

  const handleCreateCreditReport = useTryCatch(async (input: CreditReportOrderFormFields, reportId?: string) => {
    const body = {
      ...input,
      language: input.language.toUpperCase(),
    };
    return await onCreateCreditReport(body, reportId);
  });

  return { handleCreateCreditReport, createReportLoading: loading };
}
