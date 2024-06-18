import { AppTheme } from '@theme/index';
import { StyleSheet } from 'react-native';

export default ({ layout }: AppTheme) => {
  return StyleSheet.create({
    container: layout.center,
    textProgress: layout.absolute,
    wrapCircle: {
      transform: [{ rotate: '180deg' }],
    },
  });
};
