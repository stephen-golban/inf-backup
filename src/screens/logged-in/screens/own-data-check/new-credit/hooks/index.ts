import { useState } from 'react';
import { useAppStore } from '@store/app';
import { useUpdateEffect } from 'react-use';
import { useTryCatch } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { CreditReportQualityApiResponse } from '@typings/responses';

const useNewCredit = () => {
  const { user, subscription } = useAppStore(state => state);
  const inquiry = useAppDataCheckStore(state => state.inquiry);

  const [data, setData] = useState<CreditReportQualityApiResponse | null>(null);

  const qualityId = inquiry?.basicServices.creditReportQualityId;
  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts[0].accountId;

  const report = useAxios<string>(`/credit-report-quality/${qualityId}/files/JSON`, { method: 'get' });

  const [update, { loading: updateLoading }] = useLazyAxios<CreditReportQualityApiResponse>('/credit-report-quality', {
    method: 'post',
    headers: {
      'User-Account-Id': userAccountId || 114,
      'Subscription-Id': subscription?.id || 60,
    },
  });

  const fetchReport = useTryCatch(async () => await update(undefined, setData));

  useUpdateEffect(() => {
    if (report.data) {
      setData(JSON.parse(atob(report.data)));
    }
  }, [report.data]);

  return { data, report, updateLoading, fetchReport };
};

export default useNewCredit;
