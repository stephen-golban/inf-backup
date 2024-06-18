import React from 'react';
import { createRestyleComponent } from '@library/restyle';

import { ActivityIndicator as RNActivityIndicator } from 'react-native';

const ActivityIndicator = createRestyleComponent(RNActivityIndicator);

type ActivityIndicatorProps = React.ComponentProps<typeof ActivityIndicator>;

export { ActivityIndicator, type ActivityIndicatorProps };
