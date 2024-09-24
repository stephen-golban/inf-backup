import { StyleSheet } from 'react-native';

import type { AppTheme } from '@theme/index';

export default ({ colors }: AppTheme) => {
  return StyleSheet.create({
    tabList: {
      padding: 4,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tabTrigger: {
      borderRadius: 50,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    activeTab: {
      borderWidth: 1,
      borderColor: colors.blue,
      backgroundColor: colors.lightGray,
    },
    inactiveTab: {
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
    },
  });
};
