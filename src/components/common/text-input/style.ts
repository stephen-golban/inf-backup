import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ colors }: AppTheme) => {
  return StyleSheet.create({
    input: {
      flex: 1,
      color: colors.black,
      padding: 10,
      borderBottomColor: colors.transparent,
    },
    containerInput: {
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 5,
      alignItems: 'center',
      overflow: 'hidden',
    },
    lineStatus: {
      height: 1,
      width: '10%',
      position: 'absolute',
      bottom: 0,
    },
    multiline: {
      height: 100,
      paddingTop: 10,
    },
    rowLabel: {
      marginBottom: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
