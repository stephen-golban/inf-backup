import { create } from 'zustand';

import type { IAppDataCheckState } from '@typings/app';

const initial_state: IAppDataCheckState = {
  inquiry: undefined,
  creditScore: null,
  reportEvents: null,
  creditReportSummary: null,
};

const useAppDataCheckStore = create(() => initial_state);

function resetAppDataCheckStore() {
  useAppDataCheckStore.setState(initial_state);
}

export { useAppDataCheckStore, resetAppDataCheckStore };
