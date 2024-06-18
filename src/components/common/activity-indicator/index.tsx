import React from 'react';
import { createStyled } from '@library/restyle';

import { ActivityIndicator as RNActivityIndicator } from 'react-native';

const ActivityIndicator = createStyled(RNActivityIndicator);

type ActivityIndicatorProps = React.ComponentProps<typeof ActivityIndicator>;

export { ActivityIndicator, type ActivityIndicatorProps };
