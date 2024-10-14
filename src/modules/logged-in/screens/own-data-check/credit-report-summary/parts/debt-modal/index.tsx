import React from 'react';
import { isIos } from '@library/method';

import { useWindowDimensions } from 'react-native';
import useKeyboardHeight from '@api/hooks/use-keyboard-height';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoggedOutPhoneInput } from '@modules/logged-out/parts';
import { BottomSheet, FilledButton, Form, Text, View } from '@components/common';

interface IDebtModal {
  loading: boolean;
  isVisible: boolean;

  onPressNo(): void;
  onPressYes(args: DebtModalPhone): void;
}

import { DEFAULT_VALUES, DebtModalPhone, debt_modal_phone } from './resolver';

const DebtModal: React.FC<IDebtModal> = props => {
  const { isVisible, loading, onPressYes, onPressNo } = props;

  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const keyboardHeight = useKeyboardHeight();
  const snapPoints = [
    keyboardHeight
      ? isIos
        ? height - keyboardHeight - insets.bottom + 100
        : height - keyboardHeight - insets.bottom - 100
      : height * 0.85,
  ];
  return (
    <BottomSheet isVisible={isVisible} snapPoints={snapPoints}>
      <View px="lg">
        <Text my="sm" textAlign="center" variant="18-bold" t18n="logged_in:credit_report:summary:bottom_modal:get_out_of_debt_easier" />
        <Text
          mt="sm"
          textAlign="justify"
          variant="12-reg"
          color="gray"
          t18n="logged_in:credit_report:summary:bottom_modal:noticed_debts_at_incaso"
        />
        <Form defaultValues={DEFAULT_VALUES} resolver={debt_modal_phone}>
          {({ setValue, watch, handleSubmit }) => {
            return (
              <View>
                <LoggedOutPhoneInput autoFocus value={watch('phone')} onChange={txt => setValue('phone', txt, { shouldValidate: true })} />
                <FilledButton
                  t18n="logged_in:credit_report:summary:bottom_modal:yes"
                  my="sm"
                  onPress={handleSubmit(onPressYes)}
                  loading={loading}
                />
                <FilledButton t18n="logged_in:credit_report:summary:bottom_modal:no" bg="lightBlue" textColor="blue" onPress={onPressNo} />
              </View>
            );
          }}
        </Form>
      </View>
    </BottomSheet>
  );
};

export { DebtModal };
