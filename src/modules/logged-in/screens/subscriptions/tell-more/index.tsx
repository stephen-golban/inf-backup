import React from 'react';

import { useTheme } from '@theme/index';

import { Platform, KeyboardAvoidingView } from 'react-native';
import { FilledButton, Form, FormInput, Icon, Screen, View } from '@components/common';

interface ITellUsMoreModule {
  onSubmit(arg: any): void;
}

const DEFAULT_VALUES = {
  comment: '',
};

const TellUsMoreModule: React.FC<ITellUsMoreModule> = ({ onSubmit }) => {
  const { colors, spacing } = useTheme();
  return (
    <Screen pt="zero" scroll unsafe>
      <View fill>
        <View center my="md">
          <Icon icon="NotFoundIcon" bg="lightBlue" center w={150} h={150} br={999} />
        </View>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Form defaultValues={DEFAULT_VALUES}>
            {({ watch, handleSubmit }) => {
              return (
                <View>
                  <FormInput
                    autoFocus
                    style={{ backgroundColor: colors.white, borderRadius: spacing.xs, borderWidth: 1, borderColor: 'black' }}
                    multiline
                    maxLength={500}
                    name="comment"
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                  <FilledButton
                    br="xs"
                    mt="md"
                    bg="blue"
                    disabled={!watch('comment')}
                    t18n="logged_in:home:info:send"
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              );
            }}
          </Form>
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
};

export { TellUsMoreModule };
