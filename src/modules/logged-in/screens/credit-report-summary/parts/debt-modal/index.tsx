import React from 'react';
import { LoggedOutPhoneInput } from '@modules/logged-out/parts';
import { BottomSheet, FilledButton, Form, Text, View } from '@components/common';

interface IDebtModal {
  isVisible: boolean;

  onPressNo(): void;
  onPressYes(args: DebtModalPhone): void;
}

const DEFAULT_VALUES = {
  phone: '',
};

import { yupResolver } from '@hookform/resolvers/yup';
import { stringifyObjectValidate } from '@library/string';

import { type InferType, object, string } from 'yup';

const shape = object({
  phone: string()
    .required(stringifyObjectValidate({ keyT: 'validation:field_required' }))
    .min(8, stringifyObjectValidate({ keyT: 'validation:min_chars_length', options: { count: 8 } })),
});

const debt_modal_phone = yupResolver(shape);

type DebtModalPhone = InferType<typeof shape>;

export { debt_modal_phone, type DebtModalPhone };

const DebtModal: React.FC<IDebtModal> = props => {
  const { isVisible, onPressYes, onPressNo } = props;
  return (
    <BottomSheet isVisible={isVisible} snapPoints={['80%']}>
      <View px="lg">
        <Text my="sm" textAlign="center" variant="18-bold" t18n="logged_in:credit_report_summary:bottom_modal:get_out_of_debt_easier" />
        <Text
          mt="sm"
          textAlign="justify"
          variant="12-reg"
          color="gray"
          t18n="logged_in:credit_report_summary:bottom_modal:noticed_debts_at_incaso"
        />
        <Form defaultValues={DEFAULT_VALUES} resolver={debt_modal_phone}>
          {({ setValue, watch, handleSubmit }) => {
            return (
              <View>
                <LoggedOutPhoneInput autoFocus value={watch('phone')} onChange={txt => setValue('phone', txt, { shouldValidate: true })} />
                <FilledButton t18n="logged_in:credit_report_summary:bottom_modal:yes" my="sm" onPress={handleSubmit(onPressYes)} />
                <FilledButton t18n="logged_in:credit_report_summary:bottom_modal:no" bg="lightBlue" textColor="blue" onPress={onPressNo} />
              </View>
            );
          }}
        </Form>
      </View>
    </BottomSheet>
  );
};

export { DebtModal };
