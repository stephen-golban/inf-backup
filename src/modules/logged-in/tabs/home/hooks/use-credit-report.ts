import { useMount, useUpdateEffect } from 'react-use';
import { useAppStore } from '@store/app';
import { useMemo, useState } from 'react';
import { formatToCurrency } from '@library/method';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';

import type { ICreditReportSummaryResponse } from '@typings/responses';

const CREDIT_REPORT_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
  internServiceType: 'CREDIT_REPORT_SUMMARY',
};

function useCreditReport() {
  const toast = useToast();
  const { t } = useTranslation();
  const { subscription, inquiry } = useAppStore(state => state);

  const [data, setData] = useState<ICreditReportSummaryResponse>();

  const reportId = inquiry?.basicServices.creditReportSummaryId;

  const initialReport = useAxios<string>(`/credit-report/${reportId}/files/JSON`, { method: 'get' });

  const [callReport, utils] = useLazyAxios<ICreditReportSummaryResponse>('/credit-report', {
    method: 'post',
    headers: {
      'Subscription-Id': subscription?.id,
    },
  });

  useUpdateEffect(() => {
    if (initialReport.data) {
      const decodedData = JSON.parse(atob(initialReport.data));
      // console.log(decodedData);
      setData(decodedData);
    }
  }, [initialReport.data]);

  const handleResponseError = (message: string | undefined) => {
    if (message === 'User with subscription does not has access') {
      toast.show(t('ui:toasts:user_subscription_no_access'), { type: 'danger' });
      return true;
    }
    if (message === 'The limit was exceeded') {
      toast.show(t('ui:toasts:limit_was_exceeded'), { type: 'danger' });
      return true;
    }
    return false;
  };

  const fetchCreditReport = useTryCatch(async () => {
    return await callReport(CREDIT_REPORT_QUERY_PARAMS, response => {
      if (response) {
        const { message } = response;
        if (!handleResponseError(message)) {
          return setData(response);
        }
      }
    });
  });

  const totalBalance = data?.creditReport.primaryIndicators.totalBalance ?? 0;
  const badgeCount = data?.creditReport.primaryIndicators.activeCommitmentsNr ?? 0;

  const [currencyLabel, balance] = useMemo(() => formatToCurrency(totalBalance), [totalBalance]);

  const formattedCount = `${balance} ${currencyLabel}`;

  const loading = utils.loading || initialReport.loading;

  return {
    data,
    loading,
    badgeCount,
    formattedCount,
    refetch: fetchCreditReport,
  };
}

export default useCreditReport;
