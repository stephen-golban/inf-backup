import { Icon, Image, Text, View } from '@components/common';

const EmptyState: React.FC = () => {
  return (
    <View g="md" align="center">
      <Icon icon="BugIcon" />
      <View bg="lightGray" px="md" py="lg" br={24} shadow="card">
        <Text t18n="logged_in:credit_report_summary:not_have_credit_history" />
      </View>
    </View>
  );
};

export { EmptyState };
