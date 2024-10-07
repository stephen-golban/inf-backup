import { useLazyAxios } from '@api/hooks';
import { useDownloadFile, useTryCatch } from '@library/hooks';

function useCreateCreditReportService() {
  const { downloadDocument, loading: downloadingPDF } = useDownloadFile();

  const [call, utils] = useLazyAxios('/credit-report', { method: 'get' });

  const createPDF = useTryCatch(async (reportId: number, params: any = {}) => {
    return await call(undefined, response => downloadDocument(`credit_report_${reportId}.pdf`, (response as string) || ''), {
      additionalUrl: `/${reportId}/files/PDF`,
      params: {
        language: 'RO',
        ...params,
      },
    });
  });

  const loading = downloadingPDF || utils.loading;

  return { createPDF, loading };
}

export { useCreateCreditReportService };
