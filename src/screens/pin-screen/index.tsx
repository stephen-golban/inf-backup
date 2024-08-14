import React from 'react';

import { noop } from 'lodash';
import usePinScreen from './hooks';
import { useAppStore } from '@store/app';
import { useStyle } from '@library/hooks';
import { usePinCodeStore } from '@store/pin-code';

import { Loader } from '@components/ui';
import { PinCodeCustomTextes, PinCodeOptions, PinCodeStyles } from './util';

import { PinCode } from '@anhnch/react-native-pincode';

const PinScreen = () => {
  const { mode, visible } = usePinCodeStore();
  const style = useStyle(PinCodeStyles);
  const locale = useAppStore(state => state.locale);

  const { loading, onEnter, onModeChanged, onReset, onSet, pin } = usePinScreen();

  return (
    <>
      {loading && <Loader bg="blue" fill color="white" />}
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
    </>
  );
};

export { PinScreen };
