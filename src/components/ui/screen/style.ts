import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ layout, colors }: AppTheme) => {
  return StyleSheet.create({
    outer: {
      backgroundColor: colors.transparent,
      flex: 1,
      justifyContent: 'flex-start',
    },
    inner: {
      flex: 1,
      width: '100%',
    },
    flex: layout.fill,
    insets: layout.absolute,
  });
};
