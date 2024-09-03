import { Icon, Text, View } from '@components/common';

const EmptyList: React.FC = () => {
  return (
    <View g="md" center fill>
      <Icon icon="BugIcon" />
      <View bg="lightGray" px="md" py="lg" br={24}>
        <Text t18n="profile:sections:notifications:no_notifications" />
      </View>
    </View>
  );
};

export { EmptyList };
