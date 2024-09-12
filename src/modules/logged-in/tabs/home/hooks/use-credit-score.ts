import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useAppStore } from '@store/app';
import { useTryCatch } from '@library/hooks';
import { useAxios, useLazyAxios } from '@api/hooks';

import type { ICreditScoreResponse } from '@typings/responses/credit-score';

const CREDIT_SCORE_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
};

function useCreditScore() {
  const { subscription, inquiry } = useAppStore(state => state);
  const scoreId = inquiry?.basicServices.creditScoreId;
  const [score, setScore] = useState<ICreditScoreResponse | null>(null);
  const initialScore = useAxios<string>(`/credit-score/${scoreId}/files/JSON`, { method: 'get' });

  useUpdateEffect(() => {
    if (initialScore.data) {
      const decoded = JSON.parse(atob(initialScore.data));
      setScore(decoded);
    }
  }, [initialScore.data]);

  const [callScore, utils] = useLazyAxios<ICreditScoreResponse>('/credit-score', {
    method: 'post',
    headers: { 'Subscription-Id': subscription?.id || 60 },
  });

  const fetchScore = useTryCatch(async () => {
    return await callScore(CREDIT_SCORE_QUERY_PARAMS, response => {
      if (response) {
        return setScore(response);
      }
    });
  });

  const loading = utils.loading || initialScore.loading;

  return { score, fetchScore, loading };
}

export default useCreditScore;
