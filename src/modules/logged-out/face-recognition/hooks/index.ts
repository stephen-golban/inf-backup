import { useState, useRef } from 'react';
import { Camera } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';
import { useFaceDetector, FaceDetectionOptions } from 'react-native-vision-camera-face-detector';

export const useFaceDetection = (cameraRef: React.RefObject<Camera | null>) => {
  const [loading, setLoading] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isFaceVisible, setIsFaceVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: 'fast',
    landmarkMode: 'all',
    classificationMode: 'all',
  }).current;

  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  const handleDetectedFaces = Worklets.createRunOnJS(async (faces: any) => {
    if (faces.length > 1) {
      setWarningMessage('Warning: Multiple faces detected');
      setIsFaceVisible(false);
      setTimerStarted(false);
      return;
    }

    if (faces.length === 1 && !capturedImage) {
      const face = faces[0];
      const { bounds, pitchAngle, yawAngle, rollAngle } = face;

      const faceIsInFrame =
        bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.width > 100 &&
        bounds.height > 100 &&
        pitchAngle >= -15 &&
        pitchAngle <= 15 &&
        yawAngle >= -15 &&
        yawAngle <= 15 &&
        rollAngle >= -15 &&
        rollAngle <= 15;

      if (faceIsInFrame) {
        setWarningMessage('');
        setIsFaceVisible(true);

        if (!timerStarted && warningMessage === '') {
          setTimerStarted(true);
          setTimeout(async () => {
            try {
              setLoading(true);
              const photo = await cameraRef.current?.takePhoto();
              setCapturedImage(photo);
            } catch (error) {
              console.error('Error capturing image:', error);
            } finally {
              setLoading(false);
            }
          }, 1000);
        }
      } else {
        setWarningMessage('Warning: Face not correctly positioned');
        setIsFaceVisible(false);
        setTimerStarted(false);
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
