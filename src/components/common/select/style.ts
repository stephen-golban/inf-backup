import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export const MAX_HEIGHT = 250;

export default ({ colors, textVariants }: AppTheme) => {
  return StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      marginHorizontal: 0,
      marginVertical: 0,
    },
    root: {
      flex: 1,
      alignItems: 'center',
    },
    rowButton: {
      flexDirection: 'row',
      backgroundColor: colors.white,
      padding: 10,
    },
    content: {
      backgroundColor: colors.white,
      overflow: 'hidden',
      maxHeight: 250,
    },
    container: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingLeft: 5,
      backgroundColor: colors.white,
    },
    text: textVariants['14-reg'],
  });
};
