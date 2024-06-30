import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors, textVariants }: AppTheme) => {
  return StyleSheet.create({
    input: {
      flex: 1,
      height: 48,
      borderWidth: 1,
      borderRadius: 48,
      color: colors.blue,
      paddingHorizontal: 16,
      ...textVariants['16-semi'],
      borderColor: colors.transparent,
      backgroundColor: colors.lightBlue,
    },
    multiline: {
      height: 120,
      paddingTop: 10,
      paddingBottom: 30,
    },
    withIcon: {
      paddingLeft: 70,
    },
  });
};
