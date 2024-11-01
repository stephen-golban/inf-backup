import { useState } from 'react';
import { useMount } from 'react-use';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { OneSignal } from 'react-native-onesignal';
import { useAppDataCheckStore } from '@store/data-check';
import { useCurrentSubscriptionExpiryService } from '@services/subscription';

import type { CreditReportEventsApiResponse, LastInquiryApiResponse } from '@typings/responses';

const useHomeScreen = () => {
  const me = useAppStore(state => state.user);
  const subscription = useAppStore(state => state.subscription);
  const isPurchasedSubscriptionExpired = useCurrentSubscriptionExpiryService();

  OneSignal.initialize('e59eb20d-8e97-4f53-b5d5-3f3a7b63215d');
  OneSignal.login(String(me?.id));
  OneSignal.Notifications.requestPermission(true);

  const [isTrialModalVisible, setIsTrialModalVisible] = useState(false);
  const [call, { loading: loadingInquiry }] = useLazyAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  const [reportEvents, { loading: loadingReportEvents }] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
  });

  const fetchInquiryReport = useTryCatch(async () => await call(undefined, res => useAppDataCheckStore.setState({ inquiry: res })));
  const fetchReportEvents = useTryCatch(async () => {
    await reportEvents(undefined, res => useAppDataCheckStore.setState({ reportEvents: res }));
  });

  const onRefresh = async () => {
    await fetchInquiryReport();
    await fetchReportEvents();
  };

  const trialTermDate = subscription?.subscriptionAccounts?.[0].termDateTime;

  useMount(() => fetchInquiryReport());
  useMount(() => fetchReportEvents());
  useMount(() => {
    if (subscription && subscription.trial) {
      if (!isPurchasedSubscriptionExpired) {
        setIsTrialModalVisible(true);
      }
    }
  });

  const loading = loadingInquiry || loadingReportEvents;

  return { onRefresh, loading, isTrialModalVisible, setIsTrialModalVisible, trialTermDate };
};

export default useHomeScreen;
