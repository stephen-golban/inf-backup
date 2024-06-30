import { useMount } from 'react-use';
import i18n from '@translations/i18n';
import { setAppLocale, useAppStore } from '@store/app';
import { useTryCatchWithCallback } from '@library/hooks';

import type { IAppState } from '@typings/app';

function useLocaleService(runOnMount = false) {
  const locale = useAppStore(state => state.locale);

  const onChangeLocale = useTryCatchWithCallback(
    async (loc: IAppState['locale']) => {
      if (locale !== i18n.language) {
        return i18n.changeLanguage(loc);
      }
      return;
    },
    [setAppLocale, locale, i18n],
  );

  if (runOnMount) {
    useMount(() => onChangeLocale(locale));
  }

  return { locale, onChangeLocale };
}

export { useLocaleService };
