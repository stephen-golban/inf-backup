import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors, textVariants, shadows }: AppTheme) => {
  return StyleSheet.create({
    trigger: {
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      borderColor: '#d2d2d7',
      backgroundColor: 'rgba(248,248,248,0.85)',
      justifyContent: 'space-between',
    },
    placeholder: {
      ...textVariants['14-reg'],
      color: colors.gray_50,
    },
    content: {
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 8,
      maxHeight: 220,
      borderColor: '#d2d2d7',
      backgroundColor: 'rgb(248,248,248)',
      ...shadows.card,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#d2d2d7',
    },
    itemText: {
      ...textVariants['14-reg'],
      color: colors.black,
    },
  });
};
