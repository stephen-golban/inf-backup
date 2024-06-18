import type { User } from './user';
import type { ThemeType } from '@theme/index';

export interface IAppState {
  user: User | null;
  isAuthenticated: boolean;

  loadingApp: boolean;

  theme: ThemeType;

  locale: 'en' | 'ru' | 'ro';
}
