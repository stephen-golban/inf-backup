import React from 'react';

import { View, type ViewProps } from '@components/common';

const Paper: React.FC<ViewProps> = props => {
  return (
    <View
      p="md"
      bg="white"
      elevation={3}
      shadowRadius={4}
      shadowColor="black"
      shadowOpacity={0.05}
      shadowOffset={{ height: 2, width: 0 }}
      {...props}
    />
  );
};

export { Paper };
