import { useEffect } from 'react';
import { useAppStore } from '@store/app';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { ICreditScoreResponse } from '@typings/responses/credit-score';
import { CreditReportEventsApiResponse, CreditReportQualityApiResponse, LastInquiryApiResponse } from '@typings/responses';

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

  const { user } = useAppStore(state => state);

  const userAccountId = user?.accounts[0].accountId || subscription?.subscriptionAccounts?.[0].accountId;

  const [reportEvents, { loading: loadingReportEvents }] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
  });

  const [getInquiry, { loading: loadingInquiry }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  const fetchScore = useTryCatch(async () => {
    await Promise.all([
      callWithSubscription(CREDIT_SCORE_QUERY_PARAMS, res => {
        useAppDataCheckStore.setState({ creditScore: res });
      }),
      call(undefined, res => {
        useAppDataCheckStore.setState({ creditScore: JSON.parse(atob(res)) });
      }),

      reportEvents(undefined, res => {
        useAppDataCheckStore.setState({ reportEvents: res });
      }),
    ]);

    // Execute getInquiry after both call and callWithSubscription have completed
    await getInquiry(undefined, res => useAppDataCheckStore.setState({ inquiry: res }));
  });

  if (runOnMount) {
    useEffect(() => {
      if (inquiry) {
        call(undefined, res => useAppDataCheckStore.setState({ creditScore: JSON.parse(atob(res)) }));
      }
    }, [inquiry]);
  }

  const loading = featchLoading || score.loading || loadingInquiry || loadingReportEvents;

  return { fetchScore, creditScore, loading };
}

export { useCreditScoreService };
