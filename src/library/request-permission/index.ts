import { Platform } from 'react-native';
import { requestNotifications, openSettings, RESULTS, request, PERMISSIONS } from 'react-native-permissions';

// export async function useCameraPermission() {
//   const status = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.CAMERA,
//       ios: PERMISSIONS.IOS.CAMERA,
//     }),
//   );
//   return status;
// }
// export async function useMediaPermission() {
//   const statusRead = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
//       ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//     }),
//   );
//   const statusWrite = await request(
//     Platform.select({
//       android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//       ios: PERMISSIONS.IOS.MEDIA_LIBRARY,
//     }),
//   );
//   return {statusRead, statusWrite};
// }
export function useLocationPermission() {
  const permission = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  });

  const enable = async () => await request(permission!);

  return { enable };
}

const useNotificationPermissions = () => {
  const allow = async () => {
    const { status } = await requestNotifications(['alert', 'sound']);

    if (status !== RESULTS.GRANTED) {
      return openSettings();
    }
  };
  return { allow };
};

export { useNotificationPermissions };
