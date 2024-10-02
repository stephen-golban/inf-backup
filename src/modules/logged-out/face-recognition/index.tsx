import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Loader } from '@components/ui';
import { Text, View } from '@components/common';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera, useFrameProcessor } from 'react-native-vision-camera';
import { useFaceDetection } from '@modules/logged-out/face-recognition/hooks';

const FaceDetectionModule: React.FC = () => {
  const cameraRef = useRef<Camera | null>(null);

  const devices = useCameraDevices();
  const device = devices?.find(d => d.position === 'front');

  const { isFaceVisible, capturedImage, loading, warningMessage, handleDetectedFaces, detectFaces } = useFaceDetection(cameraRef);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log({ status });
    })();
  }, [device]);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces, warningMessage],
  );

  return (
    <View fill center>
      <View w={400} h={400} br={999} overflow="hidden" center>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device as never}
          isActive={!capturedImage}
          frameProcessor={frameProcessor}
          photo={true}
        />
        {loading && (
          <View absolute center>
            <Loader />
            <Text mt="xl">Capturing image...</Text>
          </View>
        )}
      </View>

      {warningMessage && (
        <View absolute bottom={50} bg="crimsonRed" p="md" br="xs">
          <Text>{warningMessage}</Text>
        </View>
      )}
    </View>
  );
};

export { FaceDetectionModule };
