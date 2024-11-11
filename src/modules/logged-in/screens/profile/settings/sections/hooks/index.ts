import { useEffect, useCallback, useMemo, useState } from 'react';
import { useMount, useToggle } from 'react-use';
import { useAxios, useLazyAxios } from '@api/hooks';
import { find, cloneDeep, merge, isEmpty } from 'lodash';

import type { NotificationSettingsApiResponse, NotificationSettingsContactData } from '@typings/responses';
import { OneSignal } from 'react-native-onesignal';

export default function useSectionsModule() {
  const [smsEnabled, toggleSms] = useToggle(false);
  const [newsletterEnabled, toggleNewsletter] = useToggle(false);
  const [sendPushNotifications, togglePushNotifications] = useToggle(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [call] = useLazyAxios('/notifications/settings', { method: 'patch' });
  const { data, loading: axiosLoading, refetch } = useAxios<NotificationSettingsApiResponse>('/notifications/settings', { method: 'get' });

  const contactData = data?.contactData;

  const smsContact = useMemo(() => {
    if (contactData) {
      return find(contactData, { type: 'PHONE', informationSending: true });
    }
    return null;
  }, [contactData]);

  const newsletterContact = useMemo(() => {
    if (contactData) {
      return find(contactData, { type: 'EMAIL', informationSending: true });
    }
    return null;
  }, [contactData]);

  useEffect(() => {
    if (data) {
      toggleSms(!!smsContact);
      toggleNewsletter(!!newsletterContact);
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  }, [data, smsContact, newsletterContact, initialLoad]);

  useMount(async () => {
    const permission = await OneSignal.User.pushSubscription.getOptedInAsync();
    togglePushNotifications(permission);
  });

  const handleTogglePushNotifications = (val: boolean) => {
    togglePushNotifications(val);
    if (val) {
      OneSignal.User.pushSubscription.optIn();
    } else {
      OneSignal.User.pushSubscription.optOut();
    }
    updateSettings({ sendPushNotifications: val });
  };

  const handleToggleSms = (val: boolean) => {
    toggleSms(val);
    updateContactData('PHONE', { informationSending: val });
  };

  const handleToggleNewsletter = (val: boolean) => {
    toggleNewsletter(val);
    updateContactData('EMAIL', { informationSending: val });
  };

  const updateContactData = useCallback(
    async (type: 'PHONE' | 'EMAIL', updatedFields: Partial<NotificationSettingsContactData>) => {
      if (isEmpty(contactData) || !contactData) return;

      const updatedContactData = cloneDeep(contactData);
      const contactIndex = updatedContactData.findIndex(contact => contact.type === type);

      if (contactIndex !== -1) {
        merge(updatedContactData[contactIndex], updatedFields);
      } else {
        updatedContactData.push({ type, ...updatedFields } as NotificationSettingsContactData);
      }

      await updateSettings({ ...data, contactData: updatedContactData });
    },
    [contactData],
  );

  const updateSettings = async (updatedData: Partial<NotificationSettingsApiResponse>) =>
    await call(updatedData, () => {
      refetch();
    });

  return {
    loading: initialLoad && axiosLoading,
    smsEnabled,
    newsletterEnabled,
    sendPushNotifications,
    refetch,
    handleToggleSms,
    handleToggleNewsletter,
    handleTogglePushNotifications,
  };
}
