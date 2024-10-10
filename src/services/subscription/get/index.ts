import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTryCatchWithCallback } from '@library/hooks';
import { setAppSubscription, useAppStore } from '@store/app';

import type { ISubscription } from '@typings/responses';

const useGetSubscription = (runOnMount = false) => {
  const subscription = useAppStore(state => state.subscription);

  const [call, { loading }] = useLazyAxios<ISubscription>('/admin-api/subscriptions/purchased', {
    method: 'get',
    params: { lastSubscription: true },
  });

  const getSubscription = useTryCatchWithCallback(async () => {
    const response = await call();
    setAppSubscription(response);

    return response;
  }, [call]);

  if (runOnMount) {
    useMount(async () => {
      const res = await getSubscription();
      if (res) {
        setAppSubscription(res);
      }
    });
  }

  return { subscription, loading, getSubscription };
};

export { useGetSubscription };
