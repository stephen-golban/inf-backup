import React from 'react';
import { Text as RNText, StyleProp, TextStyle, Linking } from 'react-native';
import { createText } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import type { AppTheme } from '@theme/index';
import type { ExtendedTextProps } from './type';

const _Text = createText<AppTheme>();

type TextProps = React.ComponentProps<typeof _Text> & ExtendedTextProps;

const urlRegex = /https?:\/\/([a-z]+\.)+[a-z]{2,6}(:\d{1,5})?(\/\S*)?/gi;
const phoneRegex = /\+?[1-9]\d{5,14}/g;

const Text: React.FC<TextProps> = ({
  t18n,
  text,
  flex,
  center,
  children,
  t18nOptions,
  style,
  readLinks = true,
  color = 'black',
  ...rest
}) => {
  const [t] = useTranslation();

  const i18nText = React.useMemo(() => t18n && t(t18n, t18nOptions), [t18n, t18nOptions, t]);

  const content = React.useMemo(() => (i18nText || text || children) as string, [i18nText, text, children]);

  const combinedStyle = React.useMemo(() => {
    const baseStyle: StyleProp<TextStyle> = [];
    if (flex) baseStyle.push({ flex: 1 });
    if (center) baseStyle.push({ textAlign: 'center' });
    if (style) baseStyle.push(style);
    return baseStyle;
  }, [flex, center, style]);

  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(\s+)/).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <RNText key={index} onPress={() => Linking.openURL(part.startsWith('http') ? part : `http://${part}`)}>
            {part}
          </RNText>
        );
      } else if (phoneRegex.test(part)) {
        return (
          <RNText key={index} onPress={() => Linking.openURL(`tel:${part}`)}>
            {part}
          </RNText>
        );
      } else {
        return <RNText key={index}>{part}</RNText>;
      }
    });
    return parts;
  };

  return (
    <_Text allowFontScaling={false} style={combinedStyle} color={color} {...rest}>
      <RNText>{typeof content === 'string' && readLinks ? renderTextWithLinks(content) : content}</RNText>
    </_Text>
  );
};

export { Text };
export type { TextProps };
