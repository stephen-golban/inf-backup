import React from 'react';
import { Text, View } from 'react-native';

import style from './style';
import equals from 'react-fast-compare';
import { useStyle } from '@library/hooks';
import { BaseButton } from '../button';
import { onCheckType } from '@library/method';

import type { SelectItemProps } from './type';

const SelectItemComponent = ({ item, index, textItemStyle, onPress, customItem }: SelectItemProps) => {
  const styles = useStyle(style);

  const _onPress = () => {
    if (onCheckType(onPress, 'function')) {
      onPress(item, index);
    }
  };

  return (
    <BaseButton onPress={_onPress} activeOpacity={0.85}>
      <View style={[[styles.container]]}>
        {customItem ? customItem(item, index) : <Text style={[styles.text, textItemStyle]} children={item.text ?? ''} />}
      </View>
    </BaseButton>
  );
};

export const SelectItem = React.memo(SelectItemComponent, equals);
