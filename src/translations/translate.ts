import { TOptionsBase } from 'i18next';
import I18n from './i18n';
import type { I18nKey } from './locales';
import { $Dictionary } from 'i18next/typescript/helpers';

export function translate(key: I18nKey, option?: (TOptionsBase & $Dictionary) | undefined) {
  return key ? I18n.t(key, option) : '';
}
