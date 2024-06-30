import { View as RNView } from 'react-native';
import { createStyled } from '@library/restyle';
import Animated from 'react-native-reanimated';

export const View = createStyled(RNView);

export type ViewProps = React.ComponentProps<typeof View>;

export const AnimatedView = Animated.createAnimatedComponent(View);
