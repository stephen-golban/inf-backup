import { useState } from 'react';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { isEmulator } from '@library/method';
import { type DeviceInfoType, fetchDeviceInfo } from './util';
import { useTryCatch, useTryCatchWithCallback } from '@library/hooks';

function useDeviceInfoService() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType | undefined>();
  const [call, { loading }] = useLazyAxios('/notifications/device-token', { method: 'post' });

  const fetchAndSetDeviceInfo = useTryCatch(async () => {
    const info = await fetchDeviceInfo();
    setDeviceInfo(info);
  });

  const saveDeviceToken = useTryCatchWithCallback(async () => {
    if (deviceInfo) {
      if (!(await isEmulator())) {
        await call({ deviceToken: deviceInfo.deviceToken });
      }
    }
  }, [deviceInfo]);

  useMount(fetchAndSetDeviceInfo);

  return { loading, deviceInfo, saveDeviceToken };
}

export { useDeviceInfoService };
