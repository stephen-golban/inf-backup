import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Loader } from '@components/ui';
import { Text, View } from '@components/common';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera, useFrameProcessor } from 'react-native-vision-camera';
import { useFaceDetection } from '@modules/logged-out/face-recognition/hooks';
import RNFS from 'react-native-fs';

interface IfaceDetectionModule {
  loading: boolean;
  onImageCaptured: (base64Image: string | null) => void;
}

const FaceDetectionModule: React.FC<IfaceDetectionModule> = ({ loading, onImageCaptured }) => {
  const cameraRef = useRef<Camera | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const borderAnimation = useRef(new Animated.Value(0)).current;

  const devices = useCameraDevices();
  const device = devices?.find(d => d.position === 'front');

  if (device == null)
    return (
      <View>
        <Text>Camera is not available</Text>
      </View>
    );

  const { capturedImage, warningMessage, handleDetectedFaces, detectFaces } = useFaceDetection(cameraRef);
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
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

  const convertToBase64 = async (uri: string) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      const img = `${base64String}`;
      setBase64Image(img);
      onImageCaptured(img);
      return img;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    if (capturedImage?.path) {
      convertToBase64(capturedImage.path);
    }
  }, [capturedImage]);

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(borderAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(borderAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    } else {
      borderAnimation.stopAnimation();
    }
  }, [loading]);

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'blue'],
  });

  const borderWidth = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  return (
    <View fill center>
      <Animated.View
        style={[
          {
            width: 400,
            height: 400,
            borderRadius: 999,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device as never}
          isActive={!capturedImage}
          frameProcessor={frameProcessor}
          photo={true}
        />
      </Animated.View>

      {warningMessage && (
        <View absolute bottom={100} left={0} right={0} center p="md">
          <Text variant="16-semi" color="black">
            {warningMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export { FaceDetectionModule };
