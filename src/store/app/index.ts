import { create } from 'zustand';
import i18n from '@translations/i18n';
import { SLICE_NAME } from '@library/constants';
import { localStorage } from '@library/storage';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';

import type { IAppState } from '@typings/app';
import { APP_DISPLAY_NAME } from '@env';

const app_state: IAppState = {
  user: null,
  cca2: null,
  theme: 'light',
  loadingApp: false,
  nomenclature: null,
  isAuthenticated: false,
  subscription: undefined,
  locale: null as IAppState['locale'] | any,
};

const persist_config: PersistOptions<IAppState> = {
  partialize: state => state as IAppState,
  storage: createJSONStorage(() => localStorage),
  name: SLICE_NAME.APP + APP_DISPLAY_NAME + 'STORE',
};

const useAppStore = create(persist(() => app_state, persist_config));

function setAppStore<K extends keyof IAppState>(key: K, value: IAppState[K]) {
  useAppStore.setState({ [key]: value });
}

function setAppIsAuthenticated(isAuthenticated: IAppState['isAuthenticated']) {
  useAppStore.setState({ isAuthenticated });
}

function setAppCca2(cca2: IAppState['cca2']) {
  useAppStore.setState({ cca2 });
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
function setAppSubscription(subscription: IAppState['subscription']) {
  useAppStore.setState({ subscription });
}
function setAppNomenclature(nomenclature: IAppState['nomenclature']) {
  useAppStore.setState({ nomenclature });
}
function setAppLocale(locale: IAppState['locale']) {
  i18n.changeLanguage(locale);
  useAppStore.setState({ locale });
}
function resetAppStore() {
  useAppStore.setState({
    user: null,
    nomenclature: null,
    isAuthenticated: false,
    subscription: undefined,
  });
}

export {
  setAppUser,
  setAppCca2,
  setAppTheme,
  setAppStore,
  setAppLocale,
  resetAppStore,
  setAppLoading,
  setAppNomenclature,
  setAppSubscription,
  setAppIsAuthenticated,
  useAppStore,
};
