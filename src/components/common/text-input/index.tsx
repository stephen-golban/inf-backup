import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { useTranslation } from 'react-i18next';
import Animated from 'react-native-reanimated';

import style from './style';
import type { TextInputProps } from './type';
import { useTheme } from '@theme/index';
import TextInputLabel from './parts/Input.Label';
import useTextInput from './hooks';
import { useStyle } from '@library/hooks';
import TextInputFocusLine from './parts/Input.FocusLine';
import TextInputErrorLine from './parts/Input.ErrorLine';

const TextInput = React.forwardRef((props: TextInputProps, ref: React.ForwardedRef<RNTextInput>) => {
  const {
    error,
    label,
    required,
    editable,
    rxFormat,
    labelI18n,
    multiline,
    placeholder,
    nameTrigger,
    rightChildren,
    placeholderI18n,
    placeholderTextColor,
    placeholderTextColorTheme,
    onBlur,
    trigger,
    onFocus,
    onChangeText,
    ...rest
  } = props;

  const [t] = useTranslation();
  const { colors } = useTheme();
  const styles = useStyle(style);
  const { fns, vars } = useTextInput({ error, onBlur, trigger, onFocus, onChangeText, rxFormat, nameTrigger, editable });

  const placeholderColor = React.useMemo(() => {
    if (!editable) {
      return colors.border;
    }
    return placeholderTextColor || (placeholderTextColorTheme && colors[placeholderTextColorTheme]);
  }, [editable, placeholderTextColor]);

  return (
    <>
      <TextInputLabel label={label} labelI18n={labelI18n} required={required} />
      <Animated.View style={[styles.containerInput, vars.containerRestyle]}>
        <RNTextInput
          {...rest}
          ref={ref}
          editable={editable}
          autoCorrect={false}
          spellCheck={false}
          multiline={multiline}
          onBlur={fns.handleBlur}
          clearButtonMode={'never'}
          onFocus={fns.handleFocus}
          selectionColor={colors.primary}
          onChangeText={fns.handleTextChange}
          underlineColorAndroid={'transparent'}
          placeholderTextColor={placeholderColor}
          style={[styles.input, multiline && styles.multiline]}
          placeholder={placeholder || (placeholderI18n && t(placeholderI18n))}
        />
        {rightChildren}
        <TextInputFocusLine focused={vars.focusedValue} disabled={vars.disabled} />
        <TextInputErrorLine error={vars.errorValue} disabled={vars.disabled} />
      </Animated.View>
    </>
  );
});

export { TextInput };
export type { TextInputProps };
