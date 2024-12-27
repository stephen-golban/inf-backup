import { useGetSubscription } from '@services/subscription';
import { useGetNomenclatures } from '@services/nomenclatures';

import { APP_SCREEN, type RootStackParamList } from '@typings/navigation';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCurrentCca2 } from '@library/hooks';

export default function useLoggedInNavigation(navigation: NativeStackNavigationProp<RootStackParamList, APP_SCREEN.LOGGED_IN>) {
  const { loading: loadingCca2 } = useCurrentCca2();
  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');
  const { loading: loadingSubscription } = useGetSubscription(true);
  const LOADING = loadingSubscription || loadingNomenclatures || loadingCca2;
  return {
    loading: LOADING,
  };
}
