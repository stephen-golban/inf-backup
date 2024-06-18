import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View, type ViewProps } from '@components/common';

interface IStaticBottomSheet extends ViewProps {}

const StaticBottomSheet: React.FC<IStaticBottomSheet> = ({ children, ...rest }) => {
  const insets = useSafeAreaInsets();

  return (
    <View pt="xl" px="lg" bg="white" minh={200} bw={1} btlr={40} btrr={40} pb={insets.bottom} {...rest}>
      {children}
    </View>
  );
};

export { StaticBottomSheet };
