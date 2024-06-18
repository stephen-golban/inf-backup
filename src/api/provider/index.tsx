import React from 'react';
import { SWRConfig } from 'swr';
import { initFocus, initReconnect, isOnline } from './util';
import { useNetInfo } from '@react-native-community/netinfo';

import type { ComponentProps } from 'react';

type SWRConfigProps = ComponentProps<typeof SWRConfig>;

function NativeSWRConfig(props: SWRConfigProps) {
  const net = useNetInfo();

  return (
    <SWRConfig
      {...props}
      value={{
        initFocus,
        isVisible: () => true,
        provider: () => new Map(),
        isOnline: () => isOnline(net),
        initReconnect: cb => initReconnect(cb, net),
        ...props.value,
      }}
    />
  );
}

export default NativeSWRConfig;
