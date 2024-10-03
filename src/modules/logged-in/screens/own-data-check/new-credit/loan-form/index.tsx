import React from 'react';

import { useTranslation } from '@library/hooks';

import { Controller } from 'react-hook-form';
import { FilledButton, Form, Icon, Select, Slider, Text, View } from '@components/common';

import type { Option } from '@rn-primitives/select';
import { type LoanFormFields, loan_form_resolver } from './resolver';

const phones = ['phone'];
const terms = ['6', '12', '18', '24', '30', '36', '42', '48', '54', '60'];

interface ILoanForm {
  onSubmit(args: LoanFormFields): void;
}

const LoanForm: React.FC<ILoanForm> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const generatedTerms = React.useMemo(() => {
    return terms.map(term => ({
      label: t('logged_in:home:own_data_check:new_credit:success:credit_term', { amount: term }),
      value: term,
    }));
  }, [t]);

  const generatedPhones = React.useMemo(() => {
    return phones.map(value => ({
      value,
      label: t('logged_in:home:own_data_check:new_credit:success:phone'),
    }));
  }, [t]);

  const defaultValues = { sliderValue: 36000, term: generatedTerms[0], phone: generatedPhones[0] };

  return (
    <Form resolver={loan_form_resolver} defaultValues={defaultValues}>
      {({ control, handleSubmit, formState, watch }) => (
        <>
          <View mt="xl" h={250} justify="flex-end">
            <Icon icon="WomanImageIcon" ml="md" absolute alignSelf="center" top={-15} />

            <View rg="xs">
              <Text t18n="logged_in:home:own_data_check:new_credit:success:quick_money" variant="18-semi" color="blue" />
              <Text t18n="logged_in:home:own_data_check:new_credit:success:amount_needed" variant="14-mid" color="black" />
            </View>
          </View>
          <FilledButton bg="lightBlue" shadow="button" br={6} mt="xxl">
            <Text
              color="blue"
              t18n="logged_in:home:own_data_check:new_credit:success:lei"
              t18nOptions={{ amount: watch('sliderValue').toLocaleString('ro-RO') }}
            />
          </FilledButton>
          <View mt="sm">
            <FilledButton bg="lightBlue" shadow="button" br={6}>
              <Controller
                name="sliderValue"
                control={control}
                render={({ field }) => <Slider value={field.value} onValueChange={field.onChange} />}
              />
            </FilledButton>
            <View between row mt="sm" px="sm">
              <Text
                variant="12-mid"
                color="blue"
                t18n="logged_in:home:own_data_check:new_credit:success:lei"
                t18nOptions={{ amount: 5000 }}
              />
              <Text
                color="blue"
                variant="12-mid"
                t18n="logged_in:home:own_data_check:new_credit:success:lei"
                t18nOptions={{ amount: '60.000' }}
              />
            </View>
            <View mt="lg" rg="lg">
              <Controller
                name="term"
                control={control}
                render={({ field }) => (
                  <Select
                    data={generatedTerms}
                    onValueChange={field.onChange}
                    value={field.value as unknown as Option}
                    placeholder={t('logged_in:home:own_data_check:new_credit:success:choose_credit_term')}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Select
                    data={generatedPhones}
                    onValueChange={field.onChange}
                    value={field.value as unknown as Option}
                    placeholder={t('logged_in:home:own_data_check:new_credit:success:phone')}
                  />
                )}
              />
              <FilledButton
                br={8}
                bg="blue"
                disabled={!formState.isValid}
                onPress={handleSubmit(onSubmit)}
                textProps={{ variant: '14-semi' }}
                t18n="logged_in:home:own_data_check:new_credit:success:get_loan"
              />
            </View>
          </View>
        </>
      )}
    </Form>
  );
};

export default LoanForm;
