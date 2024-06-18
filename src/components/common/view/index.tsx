import { View as RNView } from 'react-native';
import { createRestyleComponent } from '@library/restyle';

export const View = createRestyleComponent(RNView);

export type ViewProps = React.ComponentProps<typeof View>;
