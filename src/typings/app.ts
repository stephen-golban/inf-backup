import type { ThemeType } from '@theme/index';

export interface IAppState {
  token: string | undefined;

  loadingApp: boolean;

  theme: ThemeType;

  locale: 'en' | 'ru' | 'ro';
}
