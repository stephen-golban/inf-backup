import { useState } from 'react';
import { useAxios } from '@api/hooks';
import { useUpdateEffect } from 'react-use';
import { useAppDataCheckStore } from '@store/data-check';

import type { OwnDataCheckApiResponse } from '@typings/responses';

const useWhoCheckedCredit = () => {
  const inquiry = useAppDataCheckStore(state => state.inquiry);

  const [data, setData] = useState<OwnDataCheckApiResponse | null>(null);
  const checkId = inquiry?.basicServices.ownDataChecksReportId;

  const report = useAxios<string>(`/own-data-checks-report/${checkId}/files/JSON`, { method: 'get' });

  useUpdateEffect(() => {
    if (report.data) {
      setData(JSON.parse(atob(report.data)));
    }
  }, [report.data]);

  return { data, report };
};

export default useWhoCheckedCredit;
