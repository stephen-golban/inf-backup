import { create } from 'zustand';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

type State = {
  goBack?(): void;
  showGoBack: boolean;
};

const state: State = {
  goBack: undefined,
  showGoBack: true,
};

const store = create(() => state);

function useGoBack(showGoBack?: boolean, cb?: () => void) {
  const context = store();

  useFocusEffect(
    useCallback(() => {
      const goBack = cb ? { goBack: cb } : {};
      store.setState({
        showGoBack,
        ...goBack,
      });
    }, [showGoBack]),
  );

  return context;
}

export default useGoBack;
