import React from 'react';
import { View } from 'react-native';

import style from '../style';
import { useTheme } from '@theme/index';
import { useStyle } from '@library/hooks';
import { useTranslation } from 'react-i18next';

import { Text } from '@components/common/text';

import type { LabelProps } from '../type';

const TextInputLabel = ({ label, labelI18n, required }: LabelProps) => {
  const styles = useStyle(style);
  const [t] = useTranslation();

  const { colors } = useTheme();

  const content = React.useMemo(() => label || (labelI18n && t(labelI18n)), [label, labelI18n, t]);

  // render
  return (
    <View style={styles.rowLabel}>
      <Text style={{ color: colors.text }}>{content}</Text>
      {required ? <Text style={{ color: colors.error }}> *</Text> : null}
    </View>
  );
};

export default TextInputLabel;
