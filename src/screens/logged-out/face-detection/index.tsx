import React from 'react';
import { View } from '@components/common';
import { FaceDetectionModule } from '@modules/logged-out';

const FaceDetection: React.FC = () => {
  return (
    <View fill center>
      <FaceDetectionModule />
    </View>
  );
};

export { FaceDetection };
