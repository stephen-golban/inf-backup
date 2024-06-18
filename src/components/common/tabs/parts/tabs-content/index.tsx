import React from 'react';

import { View, type ViewProps } from '@components/common/view';

interface ITabsContent extends ViewProps {}

const TabsContent: React.FC<ITabsContent> = props => {
  return <View pt="sm" {...props} />;
};

export { TabsContent };
