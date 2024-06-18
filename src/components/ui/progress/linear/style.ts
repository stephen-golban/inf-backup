import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors }: AppTheme) => {
  return StyleSheet.create({
    bg: {
      flex: 1,
      height: 4,
      width: '100%',
      marginVertical: 3,
      overflow: 'hidden',
      backgroundColor: colors.background,
    },
    fg: {
      flex: 1,
      backgroundColor: colors.primary,
    },
  });
};
