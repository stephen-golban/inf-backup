import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

type NetInfoTuple = [boolean, boolean];

export default function useNetWorkStatus(): NetInfoTuple {
  const [status, setStatus] = useState<boolean>(true);
  const [canAccess, setCanAccess] = useState<boolean>(true);

  useEffect(() => {
    NetInfo.fetch().then((state: NetInfoState) => {
      setStatus(state.isConnected ?? true);
      setCanAccess(state.isInternetReachable ?? true);
    });

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setStatus(state.isConnected ?? true);
      setCanAccess(state.isInternetReachable ?? true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return [status, canAccess];
}
