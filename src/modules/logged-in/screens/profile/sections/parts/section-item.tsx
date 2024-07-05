import React from 'react';

import { Divider } from '@components/ui/divider';
import { BaseButton, Icon, IconType, Text, View } from '@components/common';

import type { Color } from '@theme/colors';
import type { I18nKey } from '@translations/locales';

interface ISectionItem {
  bg?: Color;
  title: I18nKey;
  icon: IconType;
  onPressItem(): void;
}

const SectionItem: React.FC<ISectionItem> = props => {
  const { bg = 'skyBlue', title, icon, onPressItem } = props;
  return (
    <View>
      <BaseButton onPress={onPressItem}>
        <View direction="row" justify="space-between" align="center">
          <View direction="row" g="md" align="center">
            <View bg={bg as Color} p="md" br={999}>
              <Icon icon={icon as IconType} size={18} />
            </View>
            <Text variant="14-reg" t18n={title} />
          </View>
          <Icon icon="ChevronRight" size={15} color="gray" />
        </View>
      </BaseButton>
      <Divider isHorizontal my="md" />
    </View>
  );
};

export { SectionItem };
