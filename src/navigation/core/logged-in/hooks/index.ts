import { useCurrentCca2 } from '@library/hooks';
import { useGetNomenclatures } from '@services/nomenclatures';

export default function useLoggedInNavigation() {
  const { loading: loadingCca2 } = useCurrentCca2();
  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');
  const LOADING = loadingNomenclatures || loadingCca2;
  return {
    loading: LOADING,
  };
}
