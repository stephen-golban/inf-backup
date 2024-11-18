import { useState, useRef } from 'react';
import { useTranslation } from '@library/hooks';
import { Camera } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useFaceDetector, FaceDetectionOptions } from 'react-native-vision-camera-face-detector';

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
    if (faces.length !== 1) {
      setWarningMessage(
        faces.length > 1 ? t('ui:face_detection:multiple_faces_warning') : t('ui:face_detection:face_not_positioned_warning'),
      );
      setIsFaceVisible(false);
      resetTimer();
      return;
    }

    const face = faces[0];
    const { bounds, pitchAngle, yawAngle, rollAngle, landmarks, rightEyeOpenProbability, leftEyeOpenProbability } = face;

    const faceIsInFrame =
      bounds.width > 100 &&
      bounds.height > 100 &&
      pitchAngle >= -10 &&
      pitchAngle <= 10 &&
      yawAngle >= -10 &&
      yawAngle <= 10 &&
      rollAngle >= -10 &&
      rollAngle <= 10 &&
      rightEyeOpenProbability > 0.5 &&
      leftEyeOpenProbability > 0.5;

    if (faceIsInFrame) {
      setWarningMessage('');
      setIsFaceVisible(true);

      if (!timerStarted) {
        startTimer();
      }
    } else {
      setWarningMessage(t('ui:face_detection:face_not_positioned_warning'));
      setIsFaceVisible(false);
      resetTimer();
    }
  });

  const startTimer = () => {
    setTimerStarted(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        if (isFaceVisible) {
          const photo = await cameraRef.current?.takePhoto();
          setCapturedImage(photo);
        }
      } catch (error) {
        console.error(t('ui:face_detection:error_capturing_image'), error);
      } finally {
        setLoading(false);
        resetTimer();
      }
    }, 300);
  };

  const resetTimer = () => {
    setTimerStarted(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return {
    isFaceVisible,
    capturedImage,
    loading,
    warningMessage,
    handleDetectedFaces,
    detectFaces,
  };
};
