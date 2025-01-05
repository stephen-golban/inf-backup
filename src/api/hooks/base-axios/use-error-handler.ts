import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useFirebaseServices, useTranslation } from '@library/hooks';

import type { BaseError } from '../type';

export default function useErrorHandler() {
  const toast = useToast();
  const { t } = useTranslation();
  const { logError } = useFirebaseServices();

  return useCallback((error: BaseError<any>, context: string, hideErrors?: boolean) => {
    // Network or connection errors
    if (!error.response || error.message.includes('Network Error') || error.message.includes('timeout')) {
      const err = new Error(t('ui:toasts:no_internet_connection'));
      if (!hideErrors) {
        toast.show(t('ui:toasts:no_internet_connection'), { type: 'danger' });
      }
      return err;
    }

    const errResMessage = (error.response?.data as any)?.message;
    logError(error, context);

    if (!hideErrors) {
      if (errResMessage) {
        toast.show(errResMessage, { type: 'danger' });
      } else if (__DEV__) {
        toast.show(error.message, { type: 'danger' });
      }
    }
    return error;
  }, []);
}
