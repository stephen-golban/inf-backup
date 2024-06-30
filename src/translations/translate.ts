import I18n from './i18n';
import type { I18nKey } from './locales';

export function translate(key: I18nKey, option?: Record<string, unknown>) {
  return key ? I18n.t(key, option) : '';
}
