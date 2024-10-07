import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { FilledButton, Icon, Screen, Text, View } from '@components/common';
import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

interface ICameraPermissionModuleProps {
  onContinue: () => void;
}

const CameraPermissionModule: React.FC<ICameraPermissionModuleProps> = ({ onContinue }) => {
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    const result = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      })!,
    );

    if (result === RESULTS.GRANTED) {
      onContinue();
    } else if (result === RESULTS.DENIED) {
      Alert.alert('Camera Permission', 'Camera permission is required to proceed. Please grant the permission.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Retry',
          onPress: handleContinue,
        },
      ]);
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert('Camera Permission', 'Camera permission is required to proceed. Please grant the permission in settings.', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open Settings',
          onPress: openSettings,
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <Screen p="md" unsafe fill bg="white">
      <View fill center justify="center" flex={1}>
        <Text variant="20-semi" color="blue" textAlign="center" my="xl" t18n="logged_out:camera-permission:title" />

        <View fill center justify="center">
          <Icon icon="FaceRecognitionIcon" size={300} color="blue" />
        </View>
        <Text variant="20-semi" color="blue" textAlign="center" lineHeight={30} t18n="logged_out:camera-permission:description" />
      </View>
      <View justify="flex-end" pb="xl">
        <FilledButton t18n="ui:continue" bg="blue" mt="xl" onPress={handleContinue} loading={loading} />
      </View>
    </Screen>
  );
};

export { CameraPermissionModule };
