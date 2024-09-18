import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useEffect, useMemo } from 'react';
import { formatToCurrency } from '@library/method';
import { useAppDataCheckStore } from '@store/data-check';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';

import type { ICreditReportSummaryResponse } from '@typings/responses';

const CREDIT_REPORT_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
  internServiceType: 'CREDIT_REPORT_SUMMARY',
};

function useCreditReportSummaryService(runOnMount = true) {
  const toast = useToast();
  const { t } = useTranslation();
  const { subscription } = useAppStore();
  const { creditReportSummary, inquiry } = useAppDataCheckStore(state => state);

  const reportId = inquiry?.basicServices.creditReportSummaryId;
  const [call, report] = useLazyAxios<string>(`/credit-report/${reportId}/files/JSON`, { method: 'get' });

  const [callWithSubscription, { loading: fetchLoading }] = useLazyAxios<ICreditReportSummaryResponse>('/credit-report', {
    method: 'post',
    headers: {
      'Subscription-Id': subscription?.id,
    },
  });

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
    return await callWithSubscription(CREDIT_REPORT_QUERY_PARAMS, response => {
      if (response) {
        const { message } = response;
        if (!handleResponseError(message)) {
          return useAppDataCheckStore.setState({ creditReportSummary: response });
        }
      }
    });
  });

  const totalBalance = creditReportSummary?.creditReport.primaryIndicators.totalBalance ?? 0;
  const badgeCount = creditReportSummary?.creditReport.primaryIndicators.activeCommitmentsNr ?? 0;

  const [currencyLabel, balance] = useMemo(() => formatToCurrency(totalBalance), [totalBalance]);

  const formattedCount = `${balance} ${currencyLabel}`;

  const loading = fetchLoading || report.loading;

  if (runOnMount) {
    useEffect(() => {
      if (inquiry) {
        call(undefined, res => useAppDataCheckStore.setState({ creditReportSummary: JSON.parse(atob(res)) }));
      }
    }, [inquiry]);
  }

  return {
    loading,
    badgeCount,
    formattedCount,
    creditReportSummary,
    fetchCreditReport,
  };
}

export { useCreditReportSummaryService };
