import { Image, Text, View } from '@components/common';

const EmptyState: React.FC = () => {
  return (
    <View g="md">
      <Image source={require('@assets/images/infodebit.png')} h={35} resizeMode="contain" />
      <View bg="lightGray" px="md" py="lg" br={24} shadow="card">
        <Text t18n="logged_in:credit_report_summary:not_have_credit_history" />
      </View>
    </View>
  );
};

export { EmptyState };
