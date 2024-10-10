import { useState } from 'react';
import { isBefore } from 'date-fns';
import { useMount } from 'react-use';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useAppDataCheckStore } from '@store/data-check';

import type { LastInquiryApiResponse } from '@typings/responses';

const useHomeScreen = () => {
  const subscription = useAppStore(state => state.subscription);
  const [isTrialModalVisible, setIsTrialModalVisible] = useState(false);
  const [call, { refetch, loading }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  useMount(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));

  const trialTermDate = subscription?.subscriptionAccounts[0].termDateTime;

  useMount(() => {
    if (subscription && subscription.trial && trialTermDate) {
      if (isBefore(new Date(trialTermDate), new Date())) {
        setIsTrialModalVisible(true);
      }
    }
  });

  return { refetch, loading, isTrialModalVisible, setIsTrialModalVisible, trialTermDate };
};

export default useHomeScreen;
