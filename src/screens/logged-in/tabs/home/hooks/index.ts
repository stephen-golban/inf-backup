import { useMount } from 'react-use';
import { useAxios } from '@api/hooks';
import { setAppUser } from '@store/app';

import { User } from '@typings/user';

const useHomeScreen = () => {
  const { data, loading } = useAxios({
    method: 'get',
    url: '/admin-api/person',
  });

  useMount(async () => {
    if (data) {
      setAppUser(data as User);
    }
  });
  return {
    data,
    loading,
  };
};

export default useHomeScreen;
