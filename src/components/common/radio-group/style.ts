import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors, textVariants, spacing }: AppTheme) => {
  return StyleSheet.create({
    container: {
      width: 18,
      height: 18,
      borderWidth: 4,
      borderRadius: 24,
      alignItems: 'center',
      borderColor: colors.blue,
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    radioIndicator: {
      width: 6,
      height: 6,
      borderRadius: 10,
      backgroundColor: colors.blue,
    },
    label: {
      ...textVariants['14-reg'],
      color: colors.black,
      marginLeft: spacing.sm,
    },
  });
};
