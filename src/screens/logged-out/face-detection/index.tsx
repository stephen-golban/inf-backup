import React, { useEffect, useState } from 'react';
import { View } from '@components/common';
import { FaceDetectionModule } from '@modules/logged-out';
import { LOGGED_OUT_SCREENS, LoggedOutStackScreenProps } from '@typings/navigation';
import useRegisterScreen from '../register/hooks';
import { saveString } from '@library/storage';
import { MMKV_KEY } from '@library/constants';

const FaceDetection: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.FaceDetection>> = props => {
  const { navigation, route } = props;
  const { values } = route.params;
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { loading, onSubmit } = useRegisterScreen(navigation, base64Image);

  useEffect(() => {
    if (base64Image && !hasSubmitted) {
      const allValues = { ...values, base64Image };
      onSubmit(allValues);
      saveString(MMKV_KEY.SEND_TO, '+373' + values.phone);
      setHasSubmitted(true);
    }
  }, [base64Image, hasSubmitted]);

  const handleImageCaptured = (image: string | null) => {
    setBase64Image(image);
    setHasSubmitted(false);
  };

  return (
    <View fill center bg="white">
      <FaceDetectionModule loading={loading} onImageCaptured={handleImageCaptured} />
    </View>
  );
};

export { FaceDetection };
