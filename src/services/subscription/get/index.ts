import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTryCatchWithCallback } from '@library/hooks';
import { setAppSubscription, useAppStore } from '@store/app';

import type { ISubscription } from '@typings/responses';

const useGetSubscription = (runOnMount = false) => {
  const subscription = useAppStore(state => state.subscription);

  const [call, { loading, cancel }] = useLazyAxios<ISubscription>('/admin-api/subscriptions/purchased', {
    method: 'get',
    params: { lastSubscription: true },
  });

  const getSubscription = useTryCatchWithCallback(async () => {
    const response = await call();
    if (response) {
      setAppSubscription(response as any);
    }

    return response;
  }, [call]);

  if (runOnMount) {
    useMount(async () => {
      const res = await getSubscription();
      if (res) {
        setAppSubscription(res as any);
      }
    });
  }

  return { subscription, loading, getSubscription, cancel };
};

export { useGetSubscription };
