import { I18nKey } from '@translations/locales';

export interface ExtendedTextProps {
  /**
   * Text which is looked up via i18n.
   * @default undefined
   */
  t18n?: I18nKey;

  /**
   * Option of i18n
   * @default undefined
   */
  t18nOptions?: any;

  /**
   * Using text string instead i18n
   * @default undefined
   */
  text?: string;

  /**
   * Enable to using {flex:1}
   * @default undefined
   */
  flex?: boolean;

  /**
   * Set true for using textAlign = 'center'
   * @default undefined
   */
  center?: boolean;

  /**
   * Set true for reading links
   * @default undefined
   */
  readLinks?: boolean;
}
