import { create } from 'zustand';
import i18n from '@translations/i18n';
import { SLICE_NAME } from '@library/constants';
import { localStorage } from '@library/storage';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';

import type { IAppState } from '@typings/app';

const app_state = (): IAppState => {
  return {
    theme: 'light',
    token: undefined,
    loadingApp: false,
    locale: i18n.languages[0] as IAppState['locale'],
  };
};

const persist_config: PersistOptions<IAppState> = {
  name: SLICE_NAME.APP + 'STORE',
  storage: createJSONStorage(() => localStorage),
  partialize: state => ({ token: state.token }) as IAppState,
};

const persisted = persist(app_state, persist_config);

const useAppStore = create<IAppState>()(persisted);

function setAppStore<K extends keyof IAppState>(key: K, value: IAppState[K]) {
  useAppStore.setState({ [key]: value });
}

function setAppToken(token: IAppState['token']) {
  useAppStore.setState({ token });
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

export { setAppStore, setAppLoading, setAppLocale, setAppTheme, setAppToken, useAppStore };
