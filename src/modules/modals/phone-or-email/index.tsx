import React from 'react';

import { Platform } from 'react-native';

import { useNotificationSettingsService } from '@services/notification-settings';

import { EmailInput, PhoneInput } from './parts';
import { BaseButton, BottomSheet, FilledButton, Form, View } from '@components/common';

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
                    <PhoneInput value={watch('phone')} onChange={txt => setValue('phone', txt, { shouldValidate: true })} />
                  )}
                </View>
                <FilledButton
                  t18n="ui:save"
                  loading={loading}
                  disabled={!formState.isValid}
                  onPress={handleSubmit(data =>
                    save(type, type === 'PHONE' ? `+373${data[type.toLowerCase()]}` : data[type.toLowerCase()]),
                  )}
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
