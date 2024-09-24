import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';
import { setAppUser, useAppStore } from '@store/app';

import type { User } from '@typings/user';
import { OneSignal } from 'react-native-onesignal';

function useMe(runOnMount = true) {
  const me = useAppStore(state => state.user);
  const [call, { loading }] = useLazyAxios<User>({ method: 'get', url: '/admin-api/person' });

  const getMe = useTryCatch(async () => await call(undefined, res => setAppUser(res)));
  OneSignal.initialize('e59eb20d-8e97-4f53-b5d5-3f3a7b63215d');
  OneSignal.login(String(me?.id));
  OneSignal.Notifications.requestPermission(true);

  if (runOnMount) {
    useMount(getMe);
  }

  return { loading, getMe, me };
}

export { useMe };
