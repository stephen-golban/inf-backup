import { find } from 'lodash';
import { useMount, useToggle } from 'react-use';
import { useAxios, useLazyAxios } from '@api/hooks';
import { useEffect, useMemo, useState } from 'react';

import { OneSignal } from 'react-native-onesignal';

import type { NotificationSettingsApiResponse } from '@typings/responses';

export default function useSectionsModule() {
  const [smsEnabled, toggleSms] = useToggle(false);
  const [newsletterEnabled, toggleNewsletter] = useToggle(false);
  const [sendPushNotifications, togglePushNotifications] = useToggle(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const [call] = useLazyAxios('/notifications/settings', { method: 'patch' });
  const { data, loading: axiosLoading } = useAxios<NotificationSettingsApiResponse>('/notifications/settings', { method: 'get' });

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
  };

  const handleToggleSms = async (val: boolean) => {
    if (!contactData) return;

    toggleSms(val);
    const smsContact = find(contactData, { type: 'PHONE' });
    const updatedContact = {
      type: 'PHONE',
      value: smsContact?.value || '',
      informationSending: val,
      invoiceDisplay: smsContact?.invoiceDisplay || false,
      invoiceSending: smsContact?.invoiceSending || false,
      credentialsSending: smsContact?.credentialsSending || false,
    };
    await updateSettings({
      contactData: [
        {
          ...updatedContact,
          type: 'PHONE' as const,
        },
      ],
    });
  };

  const handleToggleNewsletter = async (val: boolean) => {
    if (!contactData) return;

    toggleNewsletter(val);
    const emailContact = find(contactData, { type: 'EMAIL' });
    const updatedContact = {
      type: 'EMAIL',
      value: emailContact?.value || '',
      informationSending: val,
      invoiceDisplay: emailContact?.invoiceDisplay || false,
      invoiceSending: emailContact?.invoiceSending || false,
      credentialsSending: emailContact?.credentialsSending || false,
    };
    await updateSettings({
      contactData: [
        {
          ...updatedContact,
          type: 'EMAIL' as const,
        },
      ],
    });
  };

  const updateSettings = async (updatedData: Partial<NotificationSettingsApiResponse>) => {
    try {
      await call(updatedData);
    } catch (error) {
      if (updatedData.contactData?.[0].type === 'PHONE') {
        toggleSms(!updatedData.contactData[0].informationSending);
      } else if (updatedData.contactData?.[0].type === 'EMAIL') {
        toggleNewsletter(!updatedData.contactData[0].informationSending);
      }
    }
  };

  return {
    loading: initialLoad && axiosLoading,
    smsEnabled,
    newsletterEnabled,
    sendPushNotifications,
    handleToggleSms,
    handleToggleNewsletter,
    handleTogglePushNotifications,
  };
}
