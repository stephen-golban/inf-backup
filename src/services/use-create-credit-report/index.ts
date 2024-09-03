import { noop } from 'lodash';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import type { Locale } from '@typings/app';
import type { CreateCreditReportApiResponse } from '@typings/responses';

function useCreateCreditReportService() {
  const subscription = useAppStore(state => state.subscription);

  const [call, utils] = useLazyAxios('/credit-report', { method: 'get' });
  const [creditReport, creditReportUtils] = useLazyAxios<CreateCreditReportApiResponse>('/credit-report', { method: 'post' });

  const createPDF = useTryCatch(async (reportId: number, fileType: 'JSON' | 'XML' | 'HTML' | 'PDF' = 'PDF', language: Locale = 'ro') => {
    const response = await call(undefined, noop, {
      additionalUrl: `/${reportId}/files/${fileType}`,
      params: {
        language,
      },
    });
    if (response) {
      const { fs } = require('react-native-blob-util');
      const dirs = fs.dirs;
      const filePath = `${dirs.DownloadDir}/credit_report_${reportId}.pdf`;

      fs.writeFile(filePath, response, 'base64').then(() => {
        console.log('PDF file saved successfully at:', filePath);
      });
    }
  });

  const onCreateCreditReport = useTryCatch(async (body: any, orderId: string) => {
    const response = await creditReport(body, noop, {
      params: { transactionId: orderId, paymentServiceName: 'MAIB' },
      headers: { 'Subscription-Id': subscription?.id },
    });
    if (response) {
      await createPDF(response.reportId, body.language);
    }
  });

  const loading = utils.loading || creditReportUtils.loading;

  return { onCreateCreditReport, loading };
}

export { useCreateCreditReportService };
