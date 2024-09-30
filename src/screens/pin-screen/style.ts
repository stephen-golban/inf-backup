import { StyleSheet } from 'react-native';
import { DEFAULT, PinCodeT } from '@anhnch/react-native-pincode';

import type { AppTheme } from '@theme/index';

export const PinCodeStyles = (theme: AppTheme) => {
  return {
    main: {
      zIndex: 99,
      backgroundColor: theme.colors.blue,
      ...StyleSheet.absoluteFillObject,
    },
    enter: {
      ...DEFAULT.Styles.enter,
      buttonText: {
        color: theme.colors.black,
      },
    },
    set: {
      ...DEFAULT.Styles.set,
      buttonText: {
        color: theme.colors.black,
      },
    },
    locked: {
      ...DEFAULT.Styles.locked,
      buttonText: {
        color: theme.colors.black,
      },
    },
    reset: {
      ...DEFAULT.Styles.reset,
      resetButton: {
        color: theme.colors.black,
      },
      buttonText: {
        color: theme.colors.black,
      },
    },
  } as PinCodeT.PinCodeStyles;
};
