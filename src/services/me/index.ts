import { useMount, useUpdateEffect } from 'react-use';
import { useAxios, useLazyAxios } from '@api/hooks';
import { setAppInquiry, setAppUser, useAppStore } from '@store/app';

import type { User } from '@typings/user';
import type { LastInquiryApiResponse } from '@typings/responses';

function useMe(runOnMount = true) {
  const me = useAppStore(state => state.user);
  const [call, utils] = useLazyAxios<User>({ method: 'get', url: '/admin-api/person' });
  const inquiry = useAxios<LastInquiryApiResponse>('/inquiry-report', { method: 'get' });

  const getMe = async () => await call(undefined, res => setAppUser(res));

  if (runOnMount) {
    useMount(getMe);
  }

  useUpdateEffect(() => {
    if (inquiry.data) {
      setAppInquiry(inquiry.data);
    }
  }, [inquiry.data]);

  const loading = utils.loading || inquiry.loading;

  return { loading, getMe, me };
}

export { useMe };
