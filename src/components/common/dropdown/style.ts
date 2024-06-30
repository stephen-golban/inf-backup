import { useTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

import type { Color } from '@theme/colors';

export default (bg: Color) => {
  const { colors } = useTheme();
  return StyleSheet.create({
    shadow: {
      elevation: 5,
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonStyle: {
      maxHeight: 48,
      minHeight: 48,
      borderRadius: 42,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors[bg],
      justifyContent: 'space-between',
    },
    selectedTextStyle: {
      paddingLeft: 24,
      paddingVertical: 14,
    },
    itemContainerStyle: { borderRadius: 8 },
    containerStyle: {
      backgroundColor: colors[bg],
      marginTop: 10,
      borderRadius: 16,
    },
    rowStyle: {
      height: 48,
      borderRadius: 8,
      justifyContent: 'center',
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      backgroundColor: colors[bg],
    },
  });
};
