import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { setAppUser, useAppStore } from '@store/app';

import type { User } from '@typings/user';

function useMe(runOnMount = true) {
  const me = useAppStore(state => state.user);
  const [call, { loading }] = useLazyAxios<User>({ method: 'get', url: '/admin-api/person' });

  const getMe = async () => await call(undefined, res => setAppUser(res));

  if (runOnMount) {
    useMount(getMe);
  }

  return { loading, getMe, me };
}

export { useMe };
