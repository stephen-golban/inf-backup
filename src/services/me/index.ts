import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { setAppUser, useAppStore } from '@store/app';

import type { User } from '@typings/user';
import { useEffect } from 'react';
import { logEvent, setUser } from '../../../firebaseEvents';

function useMe(runOnMount = true) {
  const me = useAppStore(state => state.user);
  const [call, { loading }] = useLazyAxios<User>({ method: 'get', url: '/admin-api/person' });

  const getMe = useTryCatch(async () => await call(undefined, res => setAppUser(res)));

  useEffect(() => {
    logEvent('app_start');
    setUser(String(me?.id));
  }, [me]);

  if (runOnMount) {
    useMount(getMe);
  }

  return { loading, getMe, me };
}

export { useMe };
