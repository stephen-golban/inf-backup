import { useState } from 'react';
import { useMount } from 'react-use';
import { useLazyAxios } from '@api/hooks';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation, useTryCatch } from '@library/hooks';

import DeviceInfo from 'react-native-device-info';

import type { SettingFeedbackFormFields } from '@modules/logged-in';

const fetchDeviceInfo = async () => {
  const isEmulator = await DeviceInfo.isEmulator();

  const commonInfo = {
    uniqueId: DeviceInfo.getUniqueId(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    isTablet: DeviceInfo.isTablet(),
    hasNotch: DeviceInfo.hasNotch(),
    apiLevel: DeviceInfo.getApiLevel(),
  };

  if (isEmulator) {
    return commonInfo;
  }

  const realDeviceInfo = {
    manufacturer: await DeviceInfo.getManufacturer(),
    deviceId: DeviceInfo.getDeviceId(),
    buildId: DeviceInfo.getBuildId(),
    deviceName: await DeviceInfo.getDeviceName(),
    userAgent: await DeviceInfo.getUserAgent(),
    instanceId: await DeviceInfo.getInstanceId(),
    installReferrer: await DeviceInfo.getInstallReferrer(),
    isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
    carrier: await DeviceInfo.getCarrier(),
    isCharging: await DeviceInfo.isBatteryCharging(),
    batteryLevel: await DeviceInfo.getBatteryLevel(),
    supportedAbis: await DeviceInfo.supportedAbis(),
    ipAddress: await DeviceInfo.getIpAddress(),
    macAddress: await DeviceInfo.getMacAddress(),
    storageSize: await DeviceInfo.getTotalDiskCapacity(),
    freeStorage: await DeviceInfo.getFreeDiskStorage(),
    totalMemory: await DeviceInfo.getTotalMemory(),
  };

  return { ...commonInfo, ...realDeviceInfo };
};

export default function useTechnicalFeedbackScreen() {
  const toast = useToast();
  const { t } = useTranslation();
  const [deviceInfo, setDeviceInfo] = useState({});
  const [call, { loading }] = useLazyAxios('feedback?type=TECHNICAL_ERROR', { method: 'post' });

  useMount(() => {
    const fetchAndSetDeviceInfo = async () => {
      const info = await fetchDeviceInfo();
      setDeviceInfo(info);
    };
    fetchAndSetDeviceInfo();
  });

  const deviceInfoString = JSON.stringify(deviceInfo, null, 2);

  const onSubmit = useTryCatch(async (input: SettingFeedbackFormFields) => {
    const body = { message: `${deviceInfoString} ${input.message}` };
    await call(body, () => toast.show(t('ui:success'), { type: 'success' })); // TODO: fix after BE-fixed
  });

  return {
    onSubmit,
    loading,
  };
}
