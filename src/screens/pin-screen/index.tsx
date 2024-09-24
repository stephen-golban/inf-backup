import React from 'react';

import { noop } from 'lodash';
import usePinScreen from './hooks';
import { useAppStore } from '@store/app';
import { useStyle } from '@library/hooks';
import { Screen } from '@components/common';

import { PinCode } from '@anhnch/react-native-pincode';
import { PinCodeCustomTextes, PinCodeOptions, PinCodeStyles } from './util';

import { type RootStackScreenProps, APP_SCREEN } from '@typings/navigation';

const PinScreen: React.FC<RootStackScreenProps<APP_SCREEN.PIN_SCREEN>> = props => {
  const style = useStyle(PinCodeStyles);
  const locale = useAppStore(state => state.locale);

  const { loading, enterPin, resetPin, handleModeChange, setPinCode, mode, pin } = usePinScreen(props);

  return (
    <Screen bg="blue" unsafe statusBarStyle="light-content" loading={loading} loaderColor="white">
      <PinCode
        pin={pin}
        mode={mode}
        styles={style}
        visible={true}
        options={PinCodeOptions}
        onSet={setPinCode}
        onReset={resetPin}
        onEnter={enterPin}
        onSetCancel={noop}
        textOptions={PinCodeCustomTextes(locale)}
        onModeChanged={(_, newMode) => handleModeChange(newMode)}
      />
    </Screen>
  );
};

export { PinScreen };
