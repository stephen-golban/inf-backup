import { useAxios, useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useAppStore } from '@store/app';
import { useAppDataCheckStore } from '@store/data-check';

import type { OwnDataCheckApiResponse } from '@typings/responses';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

const useWhoCheckedCredit = () => {
  const { user, subscription } = useAppStore(state => state);
  const inquiry = useAppDataCheckStore(state => state.inquiry);

  const [data, setData] = useState<OwnDataCheckApiResponse | null>(null);
  const checkId = inquiry?.basicServices.ownDataChecksReportId;
  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts[0].accountId;

  const report = useAxios<string>(`/own-data-checks-report/${checkId}/files/JSON`, { method: 'get' });

  const [update, { loading: updateLoading }] = useLazyAxios<OwnDataCheckApiResponse>('/own-data-checks-report', {
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

export default useWhoCheckedCredit;
