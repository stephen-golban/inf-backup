import { useAxios } from '@api/hooks';
import { useAppStore } from '@store/app';

import type { CreditReportQualityApiResponse } from '@typings/responses';

const useNewCredit = () => {
  const { user, subscription } = useAppStore(state => state);

  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts[0].accountId;

  const { data, loading, refetch } = useAxios<CreditReportQualityApiResponse>('/credit-report-quality?subscriptionFreeAccess=true', {
    method: 'post',
    headers: {
      'User-Account-Id': userAccountId || 114,
      'Subscription-Id': subscription?.id || 60,
    },
  });

  return { data, loading, refetch };
};

export default useNewCredit;
