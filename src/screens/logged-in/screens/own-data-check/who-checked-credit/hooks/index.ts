import { useAxios } from '@api/hooks';
import { useAppStore } from '@store/app';

import type { OwnDataCheckApiResponse } from '@typings/responses';

const useWhoCheckedCredit = () => {
  const { user, subscription } = useAppStore(state => state);

  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts[0].accountId;

  const { loading, data, refetch } = useAxios<OwnDataCheckApiResponse>('/own-data-checks-report', {
    method: 'post',
    headers: {
      'User-Account-Id': userAccountId || 114,
      'Subscription-Id': subscription?.id || 60,
    },
  });

  return { data, loading, refetch };
};

export default useWhoCheckedCredit;
