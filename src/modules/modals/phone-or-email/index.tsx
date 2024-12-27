import React from 'react';

import { Platform } from 'react-native';

import { useNotificationSettingsService } from '@services/notification-settings';

import { EmailInput } from './parts';
import { BaseButton, BottomSheet, FilledButton, Form, PhoneInput, View } from '@components/common';

import { phoneOrEmail_form_schema } from './resolver';

import type { Noop } from 'react-hook-form';

interface IPhoneOrEmailModule {
  onSuccess: Noop;
  type: 'PHONE' | 'EMAIL';
  trigger?: React.JSX.Element;
}

const PhoneOrEmailModule: React.FC<IPhoneOrEmailModule> = ({ onSuccess, type, trigger }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const { save, loading } = useNotificationSettingsService(onSuccess);

  const triggerButton = React.useMemo(() => {
    if (trigger) return <BaseButton onPress={() => setIsVisible(true)}>{trigger}</BaseButton>;
    return (
      <FilledButton
        h={25}
        px="md"
        bg="blue"
        t18n="ui:add"
        onPress={() => setIsVisible(true)}
        textProps={{ variant: '10-reg', color: 'white' }}
      />
    );
  }, [trigger]);

  return (
    <View>
      {triggerButton}
      <BottomSheet isVisible={isVisible} onDismiss={() => setIsVisible(false)} snapPoints={[Platform.OS === 'ios' ? '30%' : '40%']}>
        <Form resolver={phoneOrEmail_form_schema(type)}>
          {({ setValue, watch, formState, handleSubmit }) => {
            return (
              <View p="xl" rg="sm">
                <View>
                  {type === 'EMAIL' ? (
                    <EmailInput />
                  ) : (
                    <PhoneInput value={watch('phone')} onChangeText={txt => setValue('phone', txt, { shouldValidate: true })} />
                  )}
                </View>
                <FilledButton
                  t18n="ui:save"
                  loading={loading}
                  disabled={!formState.isValid}
                  onPress={handleSubmit(data => {
                    const key = type.toLowerCase();
                    const entry = data[key];
                    save(key as any, entry);
                  })}
                />
              </View>
            );
          }}
        </Form>
      </BottomSheet>
    </View>
  );
};

export { PhoneOrEmailModule };
