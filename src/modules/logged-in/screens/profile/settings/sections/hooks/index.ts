import { useToggle } from 'react-use';
import { find, cloneDeep, merge, isEmpty } from 'lodash';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useEffect, useCallback, useMemo } from 'react';

import type { NotificationSettingsApiResponse, NotificationSettingsContactData } from '@typings/responses';

export default function useSettingsModule() {
  const [smsEnabled, toggleSms] = useToggle(false);
  const [newsletterEnabled, toggleNewsletter] = useToggle(false);
  const [sendPushNotifications, togglePushNotifications] = useToggle(false);

  const [call] = useLazyAxios('/notifications/settings', { method: 'patch' });
  const { data, loading, refetch } = useAxios<NotificationSettingsApiResponse>('/notifications/settings', { method: 'get' });

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
      togglePushNotifications(data.sendPushNotifications ? true : false);
    }
  }, [data, smsContact, newsletterContact]);

  const handleTogglePushNotifications = (val: boolean) => {
    togglePushNotifications(val);
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

  const updateSettings = async (updatedData: Partial<NotificationSettingsApiResponse>) => await call(updatedData, refetch);

  return {
    loading,
    smsEnabled,
    newsletterEnabled,
    sendPushNotifications,
    refetch,
    handleToggleSms,
    handleToggleNewsletter,
    handleTogglePushNotifications,
  };
}
