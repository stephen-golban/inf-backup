import { useEffect } from 'react';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { ICreditScoreResponse } from '@typings/responses/credit-score';

const CREDIT_SCORE_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
};

function useCreditScoreService(runOnMount = true) {
  const { creditScore, inquiry } = useAppDataCheckStore();
  const subscription = useAppStore(state => state.subscription);

  const scoreId = inquiry?.basicServices.creditScoreId;
  const [call, score] = useLazyAxios<string>(`/credit-score/${scoreId}/files/JSON`, { method: 'get' });
  const [callWithSubscription, { loading: featchLoading }] = useLazyAxios<ICreditScoreResponse>('/credit-score', {
    method: 'post',
    headers: { 'Subscription-Id': subscription?.id || 60 },
  });

  const fetchScore = useTryCatch(async () => {
    return await callWithSubscription(CREDIT_SCORE_QUERY_PARAMS, res => useAppDataCheckStore.setState({ creditScore: res }));
  });

  if (runOnMount) {
    useEffect(() => {
      if (inquiry) {
        call(undefined, res => useAppDataCheckStore.setState({ creditScore: JSON.parse(atob(res)) }));
      }
    }, [inquiry]);
  }

  const loading = featchLoading || score.loading;

  return { fetchScore, creditScore, loading };
}

export { useCreditScoreService };
