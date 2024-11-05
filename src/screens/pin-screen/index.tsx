import React from 'react';

import { noop } from 'lodash';
import usePinScreen from './hooks';
import { useAppStore } from '@store/app';
import { useStyle } from '@library/hooks';
import { usePinCodeStore } from '@store/pin-code';

import { PinCode } from '@anhnch/react-native-pincode';

import { PinCodeStyles } from './style';
import { PinCodeCustomTextes, PinCodeOptions } from './util';
import { Screen } from '@components/common';

const PinScreen: React.FC = () => {
  const style = useStyle(PinCodeStyles);
  const { mode, visible } = usePinCodeStore();
  const { locale, loadingApp } = useAppStore();

  const { loading, onEnter, onReset, onModeChanged, onSet, pin } = usePinScreen();

  return (
    <Screen bg="blue" fill loading={loadingApp || loading} absoluteFill statusBarStyle="light-content" loaderColor="white">
      <PinCode
        pin={pin}
        mode={mode}
        styles={style}
        visible={visible}
        options={PinCodeOptions}
        onSet={onSet}
        onReset={onReset}
        onEnter={onEnter}
        onSetCancel={noop}
        textOptions={PinCodeCustomTextes(locale)}
        onModeChanged={(_, newMode) => onModeChanged(newMode)}
      />
    </Screen>
  );
};

export { PinScreen };
