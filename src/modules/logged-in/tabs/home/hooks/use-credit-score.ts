import { useAxios } from '@api/hooks';
import { useAppStore } from '@store/app';

import type { ICreditScoreResponse } from '@typings/responses/credit-score';

const CREDIT_SCORE_QUERY_PARAMS = {
  subjectType: 'INDIVIDUAL',
  requestBasis: 'MR0000001',
};

function useCreditScore() {
  const subscription = useAppStore(state => state.subscription);

  const score = useAxios<ICreditScoreResponse>('/credit-score', {
    method: 'post',
    data: CREDIT_SCORE_QUERY_PARAMS,
    headers: { 'Subscription-Id': subscription?.id || 60 },
  });

  return score;
}

export default useCreditScore;
