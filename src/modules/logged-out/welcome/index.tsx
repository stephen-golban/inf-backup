import React from 'react';

import useWelcomeModule from './hooks';

import { FilledButton, Dropdown, Image, Screen, Text, View } from '@components/common';

interface IWelcomeModule {
  onPressContinue(): void;
}

const WelcomeModule: React.FC<IWelcomeModule> = ({ onPressContinue }) => {
  const { options, defaultValue, onChange } = useWelcomeModule();

  return (
    <Screen excludeEdges={['top']} bg="primary" p="lg">
      <View fill center>
        <View w={300} h={300}>
          <Image resizeMode="cover" source={require('@assets/images/welcome-logo.png')} />
        </View>

        <Text variant="18-reg" mt="xl" textAlign="center" mb="lg" color="secondary" t18n="logged_out:welcome:language_select" />

        <Dropdown data={options} defaultValue={defaultValue} onChange={onChange} />
      </View>

      <FilledButton t18n="ui:continue" onPress={onPressContinue} />
    </Screen>
  );
};

export { WelcomeModule };
