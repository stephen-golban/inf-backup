import { useState } from 'react';
import { useMount } from 'react-use';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { CreditReportEventsApiResponse, LastInquiryApiResponse } from '@typings/responses';

const useHomeScreen = () => {
  const subscription = useAppStore(state => state.subscription);
  const [isTrialModalVisible, setIsTrialModalVisible] = useState(false);
  const [call, { refetch, loading: loadingInquiry }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  const [reportEvents, { loading: loadingReportEvents }] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
  });

  useMount(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));
  useMount(async () => await reportEvents(undefined, res => useAppDataCheckStore.setState({ reportEvents: res })));

  useMount(() => {
    if (subscription && subscription.trial) {
      setIsTrialModalVisible(true);
    }
  });

  const trialTermDate = subscription?.subscriptionAccounts[0].termDateTime;

  const loading = loadingInquiry || loadingReportEvents;

  return { refetch, loading, isTrialModalVisible, setIsTrialModalVisible, trialTermDate };
};

export default useHomeScreen;
