import type { I18nKey } from 'translations';

export {};
declare global {
  type CustomOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type NestedNavigatorParams<ParamList> = {
    [K in keyof ParamList]: undefined extends ParamList[K] ? { screen: K; params?: ParamList[K] } : { screen: K; params: ParamList[K] };
  }[keyof ParamList];

  type IncludeMatchingProperties<T, V> = Pick<T, { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]>;

  type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];

  type ValidateMessageObject = {
    keyT: I18nKey;
    optionsTx?: Record<string, I18nKey>;
    options?: Record<string, string | number>;
  };
}
