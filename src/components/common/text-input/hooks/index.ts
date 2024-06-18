import { useTheme } from '@theme/index';
import { execFunc } from '@library/method';
import { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import type { TextInputProps } from '../type';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

type Props = Pick<TextInputProps, 'error' | 'editable' | 'rxFormat' | 'onFocus' | 'onBlur' | 'onChangeText'>;

export default function useTextInput(props: Props) {
  const { editable, error, onBlur, onFocus, rxFormat, onChangeText } = props;
  const { colors } = useTheme();

  const focusedValue = useSharedValue(false);

  const errorValue = useDerivedValue(() => error === true, [error]);

  const disabled = useDerivedValue(() => editable === false, [editable]);

  const borderColor = useDerivedValue(() => {
    if (errorValue.value) {
      return colors.error;
    } else if (focusedValue.value) {
      return colors.blue;
    } else if (disabled.value) {
      return colors.lightGray;
    } else {
      return colors.gray_80;
    }
  }, [errorValue, focusedValue, disabled]);

  function handleTextChange(text: string) {
    const actualText = rxFormat !== undefined ? text.replace(rxFormat, '') : text;

    execFunc(onChangeText, actualText);
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    focusedValue.value = true;

    execFunc(onFocus, e);
  }

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    focusedValue.value = false;

    execFunc(onBlur, e);
  }

  const inputAnimationStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(borderColor.value, { duration: 200, easing: Easing.inOut(Easing.cubic) }),
    };
  }, [borderColor.value]);

  return {
    vars: {
      disabled,
      errorValue,
      borderColor,
      focusedValue,
      inputAnimationStyle,
    },
    fns: {
      handleBlur,
      handleFocus,
      handleTextChange,
    },
  };
}
