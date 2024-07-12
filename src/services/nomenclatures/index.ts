import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { setAppNomenclature, setAppUser, useAppStore } from '@store/app';

import type { User } from '@typings/user';

function useGetNomenclatures(nomenclature: string) {
  const me = useAppStore(state => state.user);
  const [call, { loading }] = useLazyAxios<User>({ method: 'get', url: `/admin-api/nomenclatures/${nomenclature}` });

  const getNomenclature = async () => await call(undefined, res => setAppNomenclature(res));

  useMount(getNomenclature);

  return { loading, getNomenclature, me };
}

export { useGetNomenclatures };
