import { useState, useEffect } from 'react';
import { useMount } from 'react-use';
import { useAppStore } from '@store/app';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { OneSignal } from 'react-native-onesignal';
import { useAppDataCheckStore } from '@store/data-check';
import { useLastInquiryService } from '@services/last-inquiry';
import { useCurrentSubscriptionExpiryService } from '@services/subscription';

import type { CreditReportEventsApiResponse } from '@typings/responses';

const useHomeScreen = () => {
  const me = useAppStore(state => state.user);
  const subscription = useAppStore(state => state.subscription);
  const { fetchInquiryReport, loadingInquiry } = useLastInquiryService(true);
  const isPurchasedSubscriptionExpired = useCurrentSubscriptionExpiryService();

  useEffect(() => {
    OneSignal.initialize('cf0531b4-57fe-487f-bede-5f71b6b94043');
    OneSignal.login(String(me?.id));
    OneSignal.Notifications.requestPermission(true);
  }, []);

  const [isTrialModalVisible, setIsTrialModalVisible] = useState(false);

  const [reportEvents, { loading: loadingReportEvents }] = useLazyAxios<CreditReportEventsApiResponse>({
    method: 'post',
    url: '/credit-report-events?subscriptionFreeAccess=true',
  });

  const fetchReportEvents = useTryCatch(async () => {
    await reportEvents(undefined, res => {
      useAppDataCheckStore.setState({ reportEvents: res });
    });
  });

  const onRefresh = async () => {
    await fetchInquiryReport();
    await fetchReportEvents();
  };

  const trialTermDate = subscription?.subscriptionAccounts?.[0].termDateTime;

  useMount(fetchReportEvents);
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
