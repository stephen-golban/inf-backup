import React from 'react';

import { useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SelectItem } from '../select-item';

import type { SelectOption, SelectProps } from '../type';
import type { ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';

type Props = Pick<SelectProps, 'defaultSelect' | 'onPress' | 'customItem' | 'textItemStyle' | 'useBottomInset'>;

export default function useSelect(props: Props) {
  const { customItem, defaultSelect, onPress, textItemStyle, useBottomInset } = props;

  const inset = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  const [selectedText, setSelectedText] = useState(defaultSelect);

  const onPressOption = (item: SelectOption, index: number) => {
    setVisible(false);

    setSelectedText(item.text);

    onPress && onPress(item, index);
  };

  const showDrop = () => {
    setVisible(true);
  };

  const hideDrop = () => {
    setVisible(false);
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<SelectOption>) => {
    return <SelectItem customItem={customItem} textItemStyle={textItemStyle} onPress={onPressOption} item={item} index={index} />;
  };

  const keyExtractor = useCallback((item: SelectOption) => {
    return item.text + new Date().getTime().toString() + Math.floor(Math.random() * Math.floor(new Date().getTime())).toString();
  }, []);

  const content = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingBottom: useBottomInset ? inset.bottom : 0,
      },
    ],
    [inset.bottom, useBottomInset],
  );

  return {
    vars: { content, visible, selectedText },
    fns: {
      showDrop,
      hideDrop,
      renderItem,
      keyExtractor,
    },
  };
}
