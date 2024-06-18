import React from 'react';

import { useTranslation } from '@library/hooks';

import { View } from '@components/common/view';
import { Text } from '@components/common/text';

import type { LabelProps } from '../type';

const TextInputLabel = ({ label, labelI18n, required }: LabelProps) => {
  const { t } = useTranslation();

  const content = React.useMemo(() => label || (labelI18n && t(labelI18n)), [label, labelI18n, t]);

  return (
    <View mb="xs" direction="row" align="center">
      <Text variant="12-reg">{content}</Text>
      {required ? <Text color="error"> *</Text> : null}
    </View>
  );
};

export default TextInputLabel;
