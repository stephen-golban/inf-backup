import { useState } from 'react';

import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import type { ICreditScoreResponse } from '@typings/responses/credit-score';

const CREDIT_SCORE_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
};

function useCreditScore() {
  const subscription = useAppStore(state => state.subscription);
  const [score, setScore] = useState<ICreditScoreResponse | null>(null);

  const [callScore, { loading }] = useLazyAxios<ICreditScoreResponse>('/credit-score', {
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

  return { score, fetchScore, loading };
}

export default useCreditScore;
