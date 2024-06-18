import { useTheme } from '@theme/index';
import { execFunc } from '@library/method';
import { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import type { TextInputProps } from '../type';
import type { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

type Props = Pick<TextInputProps, 'error' | 'editable' | 'rxFormat' | 'trigger' | 'nameTrigger' | 'onFocus' | 'onBlur' | 'onChangeText'>;

export default function useTextInput(props: Props) {
  const { editable, error, nameTrigger, onBlur, onFocus, rxFormat, trigger, onChangeText } = props;
  const { colors } = useTheme();

  const focusedValue = useSharedValue(false);

  const errorValue = useDerivedValue(() => error === true, [error]);

  const disabled = useDerivedValue(() => editable === false, [editable]);

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled.value:
        return colors.border;
      case errorValue.value:
        return colors.error;
      case focusedValue.value:
        return colors.primary;

      default:
        return colors.line;
    }
  }, [colors.primary, colors.error, colors.card, colors.border]);

  function handleTextChange(text: string) {
    const actualText = rxFormat !== undefined ? text.replace(rxFormat, '') : text;

    execFunc(onChangeText, actualText);

    if (nameTrigger) {
      execFunc(trigger, nameTrigger);
    }
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    focusedValue.value = true;

    execFunc(onFocus, e);
  }

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    focusedValue.value = false;

    execFunc(onBlur, e);
  }

  const containerRestyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
    };
  }, []);

  return {
    vars: {
      disabled,
      errorValue,
      borderColor,
      focusedValue,
      containerRestyle,
    },
    fns: {
      handleBlur,
      handleFocus,
      handleTextChange,
    },
  };
}
