import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors, textVariants }: AppTheme) => {
  return StyleSheet.create({
    trigger: {
      height: 50,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      borderColor: colors.black,
      backgroundColor: colors.veryLightGray,
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
      borderColor: colors.gray_50,
      backgroundColor: colors.veryLightGray,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    itemText: {
      ...textVariants['14-reg'],
      color: colors.black,
    },
  });
};
