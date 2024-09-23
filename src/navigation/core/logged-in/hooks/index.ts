import { useGetNomenclatures } from '@services/nomenclatures';

import { APP_SCREEN, type RootStackParamList } from '@typings/navigation';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function useLoggedInNavigation(navigation: NativeStackNavigationProp<RootStackParamList, APP_SCREEN.LOGGED_IN>) {
  const { loading: loadingNomenclatures } = useGetNomenclatures('STAGES');

  return {
    loading: loadingNomenclatures,
  };
}
