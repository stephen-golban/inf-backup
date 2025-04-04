import { en } from './en';
import { ro } from './ro';
import { ru } from './ru';

export const resources = { en, ro, ru };

type IsNested<T> = T extends string ? false : true;

type PathImpl<K extends string, V> = V extends string ? `${K}` : `${K}:${Path<V>}`;

type TupleKeys<T extends Readonly<any>> = Exclude<keyof T, keyof any[]>;

type Path<T> =
  T extends Readonly<infer V>
    ? IsNested<T> extends true
      ? {
          [K in TupleKeys<T>]: PathImpl<K & string, T[K]>;
        }[TupleKeys<T>]
      : PathImpl<string, V>
    : never;

type ResourceType = typeof resources;

export type I18nKey = Path<ResourceType[keyof ResourceType]>;
