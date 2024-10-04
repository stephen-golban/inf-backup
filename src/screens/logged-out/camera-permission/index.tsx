import { useGoBack } from '@library/hooks';
import { CameraPermissionModule } from '@modules/logged-out';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';

const CameraPermission: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.CameraPermission>> = props => {
  const { navigation, route } = props;

  useGoBack(true, navigation.goBack);

  return (
    <CameraPermissionModule onContinue={() => navigation.navigate(LOGGED_OUT_SCREENS.FaceDetection, { values: route.params.values })} />
  );
};

export { CameraPermission };
