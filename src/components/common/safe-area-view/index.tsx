import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

import { createRestyleComponent } from '@library/restyle';

import type { ComponentProps } from 'react';

const SafeAreaView = createRestyleComponent(RNSafeAreaView);

type SafeAreaViewProps = ComponentProps<typeof SafeAreaView>;

export { SafeAreaView };
export type { SafeAreaViewProps };
