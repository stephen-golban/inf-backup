import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { LastInquiryApiResponse } from '@typings/responses';
import { useState } from 'react';
import { useAppStore } from '@store/app';

const useHomeScreen = () => {
  const subscription = useAppStore(state => state.subscription);
  const [isTrialModalVisible, setIsTrialModalVisible] = useState(false);
  const [call, { refetch, loading }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  useMount(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));

  useMount(() => {
    if (subscription && subscription.trial) {
      setIsTrialModalVisible(true);
    }
  });

  const trialTermDate = subscription?.subscriptionAccounts[0].termDateTime;

  return { refetch, loading, isTrialModalVisible, setIsTrialModalVisible, trialTermDate };
};

export default useHomeScreen;
