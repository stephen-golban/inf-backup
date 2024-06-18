import React from 'react';

import { isNumber } from 'lodash';
import { useTabsItem } from './hook';

import { Badge } from '@components/ui';
import { Text } from '@components/common/text';
import { BaseButton } from '@components/common/button';

import type { TabsItemProps } from '../../type';
import type { GestureResponderEvent } from 'react-native';

const TabsItem: React.FC<TabsItemProps> = ({ title, onPress, onLayout, badgeCount, textProps, onTabPress }) => {
  const { BADGE_SIZE, onLayoutHandler, placement } = useTabsItem(onLayout);
  function handlePress(e: GestureResponderEvent) {
    if (onTabPress) {
      onTabPress();
    }
    if (onPress) {
      onPress(e);
    }
  }

  return (
    <BaseButton onPress={handlePress} onLayout={onLayoutHandler} py="sm">
      <Text color="black" variant="16-bold" t18n={title} {...textProps} />
      {isNumber(badgeCount) && badgeCount > 0 && <Badge size={BADGE_SIZE} value={badgeCount} placement={placement} />}
    </BaseButton>
  );
};

export { TabsItem };
