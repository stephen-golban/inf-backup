import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { formatToCurrency } from '@library/method';
import { useMemo, useState } from 'react';
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
  const subscription = useAppStore(state => state.subscription);

  const [data, setData] = useState<ICreditReportSummaryResponse>();

  const [callReport, { loading }] = useLazyAxios<ICreditReportSummaryResponse>('/credit-report', {
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

  return {
    data,
    loading,
    badgeCount,
    formattedCount,
    refetch: fetchCreditReport,
  };
}

export default useCreditReport;
