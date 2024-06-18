import React from 'react';

import useWelcomeModule from './hooks';

import { FilledButton, Dropdown, Image, Screen, Text, View } from '@components/common';

interface IWelcomeModule {
  onPressContinue(): void;
}

const WelcomeModule: React.FC<IWelcomeModule> = ({ onPressContinue }) => {
  const { handleChangeLanguage, languages, selectedLanguage } = useWelcomeModule();

  return (
    <Screen unsafe bg="primary" p="lg">
      <View fill center>
        <View w={239} h={190}>
          <Image br="lg" resizeMode="cover" source={require('@assets/images/welcome-logo.jpeg')} />
        </View>

        <Text variant="18-reg" mt="xxl" textAlign="center" mb="lg" color="secondary" t18n="logged_out:welcome:language_select" />

        <Dropdown data={languages} defaultValue={selectedLanguage} onChange={handleChangeLanguage} />
      </View>

      <FilledButton t18n="ui:continue" onPress={onPressContinue} textColor="white" />
    </Screen>
  );
};

export { WelcomeModule };
