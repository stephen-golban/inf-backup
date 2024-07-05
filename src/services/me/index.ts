import { useMount } from 'react-use';
import { setAppUser } from '@store/app';
import { useLazyAxios } from '@api/hooks';

import type { User } from '@typings/user';

function useMe(runOnMount = true) {
  const [call, { loading }] = useLazyAxios<User>({ method: 'get', url: '/admin-api/person' });

  const getMe = async () => await call(undefined, res => setAppUser(res));

  if (runOnMount) {
    useMount(getMe);
  }

  return { loading, getMe };
}

export { useMe };
