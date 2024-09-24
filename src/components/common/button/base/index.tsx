import React, { forwardRef, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

import { useThrottle } from './hook';
import { createStyled } from '@library/restyle';

import { Text } from '@components/common/text';
import { View } from '@components/common/view';
import { ActivityIndicator } from '../../activity-indicator';

import type { ExtendedButtonProps } from './type';

const StyledButton = createStyled(TouchableOpacity);

type ButtonProps = React.ComponentProps<typeof StyledButton> & ExtendedButtonProps;

const calculateDisabledStyle = (isLoading: boolean, isDisabled: boolean): Partial<ButtonProps> => {
  return isLoading || isDisabled ? { opacity: 0.5, disabled: true } : { disabled: false };
};

const BaseButton = forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      text,
      t18n,
      loading = false,
      disabled = false,
      children,
      textProps,
      textColor,
      throttleMs,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      loaderColor = 'white',
      ...rest
    },
    ref,
  ) => {
    const [, handlePress, handleLongPress, handlePressIn, handlePressOut] = useThrottle({
      throttleMs,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
    });

    const disabledStyle = useMemo(() => calculateDisabledStyle(loading, disabled), [loading, disabled]);

    return (
      <StyledButton
        ref={ref}
        activeOpacity={1}
        {...disabledStyle}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLongPress={handleLongPress}
        {...rest}>
        {loading ? (
          <View absoluteFill center>
            <ActivityIndicator size="small" color={loaderColor} />
          </View>
        ) : (
          children || <Text t18n={t18n} text={text} color={textColor} variant="16-bold" {...textProps} />
        )}
      </StyledButton>
    );
  },
);

export { BaseButton };
export type { ButtonProps };
