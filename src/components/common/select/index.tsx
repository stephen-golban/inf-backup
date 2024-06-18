import React from 'react';

import style from './style';
import useSelect from './hooks';
import { useStyle } from '@library/hooks';
import { useTranslation } from 'react-i18next';
import { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { Modal } from '../modal';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import type { SelectProps } from './type';

const Select: React.FC<SelectProps> = props => {
  const [t] = useTranslation();
  const styles = useStyle(style);

  const {
    textItemStyle,
    rightChildren,
    onPress,
    customItem = undefined,
    useBottomInset = true,
    defaultSelect = t('dialog:select'),
    data = [],
    ...rest
  } = props;
  const { fns, vars } = useSelect({ textItemStyle, onPress, customItem, useBottomInset, defaultSelect });
  return (
    <>
      <View style={[styles.root]} collapsable={false}>
        <TouchableOpacity onPress={fns.showDrop} activeOpacity={0.68}>
          <View style={[styles.rowButton]}>
            <Text children={vars.selectedText} />
            {rightChildren}
          </View>
        </TouchableOpacity>
        <Modal
          backdropOpacity={0.3}
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[styles.modal]}
          onBackdropPress={fns.hideDrop}
          onBackButtonPress={fns.hideDrop}
          isVisible={vars.visible}>
          <View>
            <View style={[styles.content, vars.content]}>
              <FlatList data={data} keyExtractor={fns.keyExtractor} renderItem={fns.renderItem} {...rest} />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export { Select };
