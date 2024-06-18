import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors }: AppTheme) => {
  return StyleSheet.create({
    input: {
      flex: 1,
      height: 56,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      color: colors.black,
      borderColor: colors.gray_80,
      backgroundColor: colors.white,
    },
    multiline: {
      height: 120,
      paddingTop: 10,
      paddingBottom: 30,
    },
    withIcon: {
      paddingLeft: 35,
    },
  });
};
