import { View as RNView } from 'react-native';
import { createStyled } from '@library/restyle';

export const View = createStyled(RNView);

export type ViewProps = React.ComponentProps<typeof View>;
