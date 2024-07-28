import React from 'react';
import { FilledButton, Icon, Text, View } from '@components/common';

interface ICorectionProcedure {
  onPress(): void;
}

const CorrectionProcedure: React.FC<ICorectionProcedure> = ({ onPress }) => {
  return (
    <View p="sm" bg="white">
      <View mx="lg">
        <View center my="md">
          <Icon icon="NotFoundIcon" bg="lightBlue" center w={150} h={150} br={999} />
        </View>
        <Text t18n="profile:faq:error_correction_procedure" variant="24-reg" />
        <Text t18n="profile:faq:error_correction_procedure_description" variant="14-reg" my="lg" lineHeight={20} color="gray" />
        <FilledButton t18n="profile:faq:read" br="sm" mb="lg" alignSelf="flex-start" px="xl" onPress={onPress} />
      </View>
    </View>
  );
};

export { CorrectionProcedure };
