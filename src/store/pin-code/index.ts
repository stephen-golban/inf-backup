import { create } from 'zustand';
import { loadString } from '@library/storage';

import { PIN_CODE } from '@library/constants';
import { PinCodeT } from '@anhnch/react-native-pincode';

interface IPinCodeStore {
  visible: boolean;
  mode: PinCodeT.Modes;
}

const store = create<IPinCodeStore>();

export const usePinCodeStore = store(() => {
  const pin = loadString(PIN_CODE.pin);

  return {
    visible: pin ? true : false,
    mode: pin ? PinCodeT.Modes.Enter : PinCodeT.Modes.Set,
  };
});
