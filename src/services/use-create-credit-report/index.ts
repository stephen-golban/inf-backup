import { noop } from 'lodash';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useDownloadFile, useTryCatch } from '@library/hooks';

import type { Locale } from '@typings/app';
import type { CreateCreditReportApiResponse } from '@typings/responses';

function useCreateCreditReportService() {
  const subscription = useAppStore(state => state.subscription);
  const { downloadDocument, loading: downloadingPDF } = useDownloadFile();

  const [call, utils] = useLazyAxios('/credit-report', { method: 'get' });
  const [creditReport, creditReportUtils] = useLazyAxios<CreateCreditReportApiResponse>('/credit-report', { method: 'post' });

  const createPDF = useTryCatch(async (reportId: number, fileType: 'JSON' | 'XML' | 'HTML' | 'PDF' = 'PDF', language: Locale = 'ro') => {
    return await call(undefined, response => downloadDocument(`credit_report_${reportId}.pdf`, (response as string) || ''), {
      additionalUrl: `/${reportId}/files/${fileType}`,
      params: {
        language,
      },
    });
  });

  const onCreateCreditReport = useTryCatch(async (body: any, orderId?: string) => {
    const response = await creditReport(body, noop, {
      params: { ...(orderId && { transactionId: orderId }), paymentServiceName: 'MAIB' },
      headers: { 'Subscription-Id': subscription?.id },
    });
    if (response) {
      await createPDF(response.reportId, 'PDF', body.language);
    }
  });

  const loading = utils.loading || creditReportUtils.loading || downloadingPDF;

  return { onCreateCreditReport, loading };
}

export { useCreateCreditReportService };
