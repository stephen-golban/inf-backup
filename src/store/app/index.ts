import { create } from 'zustand';
import i18n from '@translations/i18n';
import { SLICE_NAME } from '@library/constants';
import { localStorage } from '@library/storage';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';

import type { IAppState } from '@typings/app';
import { APP_DISPLAY_NAME } from '@env';

const app_state = (): IAppState => {
  return {
    user: null,
    theme: 'light',
    loadingApp: false,
    isAuthenticated: false,
    locale: i18n.languages[0] as IAppState['locale'],
  };
};

const persist_config: PersistOptions<IAppState> = {
  partialize: state => state as IAppState,
  storage: createJSONStorage(() => localStorage),
  name: SLICE_NAME.APP + APP_DISPLAY_NAME + 'STORE',
};

const persisted = persist(app_state, persist_config);

const useAppStore = create<IAppState>()(persisted);

function setAppStore<K extends keyof IAppState>(key: K, value: IAppState[K]) {
  useAppStore.setState({ [key]: value });
}

function setAppIsAuthenticated(isAuthenticated: IAppState['isAuthenticated']) {
  useAppStore.setState({ isAuthenticated });
}

function setAppUser(user: IAppState['user']) {
  useAppStore.setState({ user });
}

function setAppTheme(theme: IAppState['theme']) {
  useAppStore.setState({ theme });
}
function setAppLoading(loadingApp: IAppState['loadingApp']) {
  useAppStore.setState({ loadingApp });
}
function setAppLocale(locale: IAppState['locale']) {
  i18n.changeLanguage(locale);
  useAppStore.setState({ locale });
}

export { setAppStore, setAppLoading, setAppLocale, setAppTheme, setAppIsAuthenticated, setAppUser, useAppStore };
