import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import style from './style';
import useTextInput from './hooks';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';
import { useTranslation } from 'react-i18next';

import { View } from '../view';
import { Icon } from '../icon';
import { Label } from './parts';
import { BaseButton } from '../button';
import Animated from 'react-native-reanimated';

import { EyeCloseIcon, EyeOpenIcon } from '@components/icons';

import type { TextInputProps } from './type';

const AnimatedInput = Animated.createAnimatedComponent(RNTextInput);

const TextInput = React.forwardRef((props: TextInputProps, ref: React.ForwardedRef<RNTextInput>) => {
  const {
    icon,
    error,
    label,
    prefix,
    sufix,
    required,
    editable,
    rxFormat,
    labelI18n,
    multiline,
    iconProps,
    placeholder,
    rightChildren,
    placeholderI18n,
    style: incomingStyle,
    placeholderTextColor = 'gray',
    onBlur,
    onFocus,
    onChangeText,
    ...rest
  } = props;

  const [t] = useTranslation();
  const { colors } = useTheme();
  const styles = useStyle(style);
  const { fns, vars } = useTextInput({ error, onBlur, onFocus, onChangeText, rxFormat, editable });
  const [isPasswordInput, setIsPasswordInput] = React.useState(rest.secureTextEntry ?? false);

  const PWD_ICONS = {
    false: EyeOpenIcon,
    true: EyeCloseIcon,
  };

  const getPasswordIcon = (passwordInput: boolean) => {
    return PWD_ICONS[String(passwordInput) as keyof typeof PWD_ICONS];
  };

  const PasswordIcon = getPasswordIcon(isPasswordInput);

  const renderInputPrefix = React.useMemo(() => {
    if (icon) {
      return <Icon icon={icon} absolute zIndex="huge" size={18} left={10} {...iconProps} />;
    }
    return (
      <View absolute zIndex="huge" left={15} {...(iconProps as unknown as any)}>
        {prefix}
      </View>
    );
  }, [prefix, icon, iconProps]);

  const renderStyle = React.useMemo(() => {
    return [styles.input, vars.inputAnimationStyle, multiline && styles.multiline, (icon || prefix) && styles.withIcon, incomingStyle];
  }, [styles, vars.inputAnimationStyle, icon, prefix, incomingStyle]);

  return (
    <>
      <Label label={label} labelI18n={labelI18n} required={required} />
      <View direction="row" align="center">
        {renderInputPrefix}
        <AnimatedInput
          {...rest}
          ref={ref}
          spellCheck={false}
          autoCorrect={false}
          editable={editable}
          style={renderStyle}
          multiline={multiline}
          textAlignVertical="top"
          onBlur={fns.handleBlur}
          clearButtonMode={'never'}
          onFocus={fns.handleFocus}
          cursorColor={colors.black}
          selectionColor={colors.skyBlue}
          onChangeText={fns.handleTextChange}
          underlineColorAndroid={'transparent'}
          secureTextEntry={isPasswordInput}
          placeholderTextColor={colors[placeholderTextColor]}
          placeholder={placeholder || (placeholderI18n && t(placeholderI18n))}
        />
        {rest.secureTextEntry ? (
          <View position="absolute" zIndex="huge" right={10} {...(iconProps as unknown as any)}>
            <BaseButton onPress={() => setIsPasswordInput(prev => !prev)}>
              <PasswordIcon color={colors.black} />
            </BaseButton>
          </View>
        ) : (
          rightChildren
        )}
      </View>
    </>
  );
});

export { TextInput };
export type { TextInputProps };
