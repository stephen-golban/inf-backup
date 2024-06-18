import React from 'react';
import { Text as RNText, StyleProp, type TextStyle } from 'react-native';

import { createText } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import type { AppTheme } from '@theme/index';
import type { ExtendedTextProps } from './type';

const _Text = createText<AppTheme>(RNText);

type TextProps = React.ComponentProps<typeof _Text> & ExtendedTextProps;

const Text = ({ t18n, text, flex, center, children, t18nOptions, style, color = 'white', ...rest }: TextProps) => {
  const [t] = useTranslation();

  const i18nText = React.useMemo(() => t18n && t(t18n, t18nOptions), [t18n, t18nOptions, t]);

  const content = React.useMemo(() => (i18nText || text || children) as React.ReactNode, [i18nText, text, children]);
  const styleComponent = React.useMemo<StyleProp<TextStyle>>(() => {
    return [flex === true && { flex: 1 }, center && { textAlign: 'center' }];
  }, [flex, center]);

  return (
    <_Text allowFontScaling={false} style={[styleComponent, style]} color={color} {...rest}>
      {content}
    </_Text>
  );
};

export { Text };
export type { TextProps };
