import { isEmulator } from '@library/method';
import DeviceInfo from 'react-native-device-info';

export const fetchDeviceInfo = async () => {
  const isRealDevice = !(await isEmulator());
  return {
    uniqueId: await DeviceInfo.getUniqueId(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    isTablet: DeviceInfo.isTablet(),
    hasNotch: DeviceInfo.hasNotch(),
    apiLevel: await DeviceInfo.getApiLevel(),

    deviceToken: isRealDevice ? await DeviceInfo.getDeviceToken() : undefined,
    manufacturer: isRealDevice ? await DeviceInfo.getManufacturer() : undefined,
    deviceId: isRealDevice ? DeviceInfo.getDeviceId() : undefined,
    buildId: isRealDevice ? await DeviceInfo.getBuildId() : undefined,
    deviceName: isRealDevice ? await DeviceInfo.getDeviceName() : undefined,
    userAgent: isRealDevice ? await DeviceInfo.getUserAgent() : undefined,
    instanceId: isRealDevice ? await DeviceInfo.getInstanceId() : undefined,
    installReferrer: isRealDevice ? await DeviceInfo.getInstallReferrer() : undefined,
    isPinOrFingerprintSet: isRealDevice ? await DeviceInfo.isPinOrFingerprintSet() : undefined,
    carrier: isRealDevice ? await DeviceInfo.getCarrier() : undefined,
    isCharging: isRealDevice ? await DeviceInfo.isBatteryCharging() : undefined,
    batteryLevel: isRealDevice ? await DeviceInfo.getBatteryLevel() : undefined,
    supportedAbis: isRealDevice ? await DeviceInfo.supportedAbis() : undefined,
    ipAddress: isRealDevice ? await DeviceInfo.getIpAddress() : undefined,
    macAddress: isRealDevice ? await DeviceInfo.getMacAddress() : undefined,
    storageSize: isRealDevice ? await DeviceInfo.getTotalDiskCapacity() : undefined,
    freeStorage: isRealDevice ? await DeviceInfo.getFreeDiskStorage() : undefined,
    totalMemory: isRealDevice ? await DeviceInfo.getTotalMemory() : undefined,
  };
};

export type DeviceInfoType = Awaited<ReturnType<typeof fetchDeviceInfo>>;
