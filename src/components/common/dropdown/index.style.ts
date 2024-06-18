import { useTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default (bg: string) => {
  const { colors } = useTheme();
  return StyleSheet.create({
    buttonStyle: {
      height: 48,
      width: '100%',
      borderRadius: 42,
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      backgroundColor: bg,
      paddingHorizontal: 24,
      justifyContent: 'space-between',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dropdownStyle: {
      marginTop: 10,
      borderRadius: 16,
      paddingVertical: 5,
    },
    rowStyle: (idx: number) => ({
      height: 48,
      justifyContent: 'center',
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      borderBottomColor: idx !== 2 ? colors.gray_80 : colors.transparent,
    }),
  } as any);
};
