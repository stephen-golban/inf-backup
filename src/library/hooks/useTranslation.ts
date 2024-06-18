import type { I18nKey } from 'translations';
import type { InterpolationMap } from 'i18next';
import { type UseTranslationOptions, useTranslation as useITranslation } from 'react-i18next';

function useTranslation(ns?: I18nKey, opts?: UseTranslationOptions<any>) {
  const { t: T, ...rest } = useITranslation<I18nKey>(ns, opts);
  const t = (key: I18nKey, options?: InterpolationMap<any>) => T(key, options);

  return { t, ...rest };
}
export default useTranslation;
