import { Avatar, Icon, Text, View } from '@components/common';
import React from 'react';

interface IRowInfo {
  tag?: string;
  title: string;
  hasInfo: boolean;
  discount?: number;
  isLast?: boolean;
  disabled: boolean;
}

const RowInfo: React.FC<IRowInfo> = ({ isLast, disabled, hasInfo, title, discount, tag }) => {
  return (
    <View row align="center">
      {isLast && discount ? (
        <Text variant="14-reg" text={`-${discount}%`} mr="sm" />
      ) : (
        <>
          {tag ? (
            <View bg="goldenYellow" px="md" py="sm" br="md">
              <Text variant="12-bold" text={tag} />
            </View>
          ) : (
            <View row align="center" cg="sm">
              <Icon
                icon="CheckCircleIcon"
                size={23}
                color={disabled ? 'gray_80' : 'teal'}
                iconProps={{ checkColor: disabled ? 'gray' : 'white' }}
              />
              <Avatar.Base br="huge" center size={23} bg={disabled ? 'error' : 'gray_80'}>
                <Icon icon="CloseIcon" size={16} color={disabled ? 'white' : 'gray'} />
              </Avatar.Base>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default RowInfo;
