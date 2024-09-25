import React from 'react';

import { BaseButton, type ButtonProps, Icon, IconType, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface IRowBox extends Pick<ButtonProps, 'onPress'> {
  icon: IconType;
  title: I18nKey;
}

const RowBox: React.FC<IRowBox> = ({ icon, title, onPress }) => {
  return (
    <BaseButton py="md" px="md" br={10} bg="lightBlue" onPress={onPress} row between align="center" shadow="card">
      <View row align="center" cg="sm" fill>
        <View bg="blue" w={40} h={40} br="round" center>
          <Icon icon={icon} color="white" size={18} />
        </View>
        <Text variant="14-reg" flex t18n={title} />
      </View>
      <Icon icon="ChevronRight" size={12} />
    </BaseButton>
  );
};

export default RowBox;
