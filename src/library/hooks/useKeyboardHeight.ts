import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener, KeyboardEvent } from 'react-native';

const useKeyboardHeight = (): number => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const onKeyboardDidShow: KeyboardEventListener = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardDidHide: KeyboardEventListener = () => {
      setKeyboardHeight(0);
    };

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;
