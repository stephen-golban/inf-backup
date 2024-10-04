import { useState, useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useFaceDetector, FaceDetectionOptions } from 'react-native-vision-camera-face-detector';
import { useTranslation } from '@library/hooks';

export const useFaceDetection = (cameraRef: React.RefObject<Camera | null>) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isFaceVisible, setIsFaceVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const timeoutRef = useRef<any>(null);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: 'fast',
    landmarkMode: 'all',
    classificationMode: 'all',
  }).current;

  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  const handleDetectedFaces = Worklets.createRunOnJS(async (faces: any) => {
    if (faces.length > 1) {
      setWarningMessage(t('ui:face_detection:multiple_faces_warning'));
      setIsFaceVisible(false);
      setTimerStarted(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    if (faces.length === 1 && !capturedImage) {
      const face = faces[0];
      const { bounds, pitchAngle, yawAngle, rollAngle, landmarks } = face;

      const faceIsInFrame =
        bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.width > 100 &&
        bounds.height > 100 &&
        pitchAngle >= -10 &&
        pitchAngle <= 10 &&
        yawAngle >= -10 &&
        yawAngle <= 10 &&
        rollAngle >= -10 &&
        rollAngle <= 10;

      if (faceIsInFrame) {
        setWarningMessage('');
        setIsFaceVisible(true);

        if (!timerStarted && warningMessage === '') {
          setTimerStarted(true);
          timeoutRef.current = setTimeout(async () => {
            try {
              setLoading(true);
              const photo = await cameraRef.current?.takePhoto();
              setCapturedImage(photo);
            } catch (error) {
              console.error(t('ui:face_detection:error_capturing_image'), error);
            } finally {
              setLoading(false);
              timeoutRef.current = null;
            }
          }, 1000);
        }
      } else {
        setWarningMessage(t('ui:face_detection:face_not_positioned_warning'));
        setIsFaceVisible(false);
        setTimerStarted(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    }
  });

  return {
    isFaceVisible,
    capturedImage,
    loading,
    warningMessage,
    handleDetectedFaces,
    detectFaces,
  };
};
