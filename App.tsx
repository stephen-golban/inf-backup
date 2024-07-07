import React from 'react';
import { useColorScheme } from 'react-native';

import { setAppTheme, useAppStore } from '@store/app';
import { internationalization } from '@translations/index';

import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@shopify/restyle';
import ApplicationNavigator from '@navigation/index';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { THEME } from '@theme/index';

const MyApp = () => {
  const scheme = useColorScheme();
  const themeType = useAppStore(state => state.theme);

  React.useEffect(() => {
    if (scheme) {
      setAppTheme(scheme);
    }
  }, [scheme]);

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={internationalization}>
        <ThemeProvider theme={THEME[themeType]}>
          <ToastProvider placement="top" offsetTop={0} animationType="slide-in">
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
                <ApplicationNavigator />
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </ToastProvider>
        </ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
};

export default MyApp;
