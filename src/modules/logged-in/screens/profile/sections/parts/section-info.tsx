import React from 'react';
import { Avatar } from '@components/common/avatar';
import { Icon, Text, View } from '@components/common';

interface ISectionInfo {
  avatar?: string;
  lastName?: string;
  firstName?: string;
  onEdit(): void;
}

const SectionInfo: React.FC<ISectionInfo> = props => {
  const { avatar, firstName, lastName, onEdit } = props;
  const avatarUri = avatar ? `data:image/jpeg;base64,${avatar}` : undefined;

  return (
    <View center>
      <View center>
        <View relative>
          <Avatar.Image source={{ uri: avatarUri }} size={120} />
          <View absolute bottom={10} right={15} bg="blue" p="xs" br={999}>
            <Icon icon="EditIcon" size={18} onPress={onEdit} />
          </View>
        </View>
      </View>
      <Text my="sm" variant="16-mid">{`${firstName} ${lastName}`}</Text>
    </View>
  );
};

export default SectionInfo;
