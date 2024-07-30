import React from 'react';

import { useTheme } from '@theme/index';
import { useRatingsModal } from './hooks';
import { useTranslation } from '@library/hooks';
import { useToast } from 'react-native-toast-notifications';
import useKeyboardHeight from '@api/hooks/use-keyboard-height';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIos } from '@library/method';

import { StarRating } from '@components/ui';
import { Controller, useWatch } from 'react-hook-form';
import { ratings_form_schema } from './resolver';
import { Platform, KeyboardAvoidingView, useWindowDimensions } from 'react-native';
import { BottomSheet, FilledButton, Form, FormInput, Text, View } from '@components/common';

interface IRatingModal {
  isVisible: boolean;
  onDismiss(): void;
}

const DEFAULT_VALUES = {
  comment: '',
  rating: 0,
};

const RatingModal: React.FC<IRatingModal> = props => {
  const { isVisible, onDismiss } = props;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors, spacing } = useTheme();
  const { height } = useWindowDimensions();
  const keyboardHeight = useKeyboardHeight();
  const { call, loading } = useRatingsModal();
  const toast = useToast();

  const snapPoints = [
    keyboardHeight
      ? isIos
        ? height - keyboardHeight - insets.bottom + 100
        : height - keyboardHeight - insets.bottom - 100
      : height * 0.85,
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: colors.lightBlue }}
      onDismiss={onDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
        <View row justify="space-between" px="md">
          <View fill>
            <Text
              variant="14-reg"
              center
              px="lg"
              lineHeight={20}
              mb="md"
              t18n="logged_in:home:own_data_check:who_checked:app_satisfied_overall"
            />
            <Form defaultValues={DEFAULT_VALUES} resolver={ratings_form_schema}>
              {({ control, formState, handleSubmit }) => {
                const rating = useWatch({ control, name: 'rating' });
                let placeholder = t('ui:placeholders:neutral_feedback');

                if (rating >= 1 && rating <= 2) {
                  placeholder = t('ui:placeholders:negative_feedback');
                } else if (rating >= 3 && rating <= 4) {
                  placeholder = t('ui:placeholders:neutral_feedback');
                } else if (rating === 5) {
                  placeholder = t('ui:placeholders:positive_feedback');
                }

                return (
                  <View style={{ paddingBottom: keyboardHeight + insets.bottom + 50 }}>
                    <Controller
                      control={control}
                      name="rating"
                      render={({ field }) => (
                        <View center>
                          <StarRating
                            rating={field.value}
                            enableHalfStar={false}
                            onChange={(newRating: number) => field.onChange(newRating || 1)}
                          />
                        </View>
                      )}
                    />
                    <FormInput
                      autoFocus
                      style={{ backgroundColor: colors.white, borderRadius: spacing.xs }}
                      multiline
                      maxLength={300}
                      name="comment"
                      autoCorrect={false}
                      autoCapitalize="none"
                      placeholder={placeholder}
                    />
                    <FilledButton
                      br="xs"
                      mt="md"
                      bg="blue"
                      loading={loading}
                      disabled={!formState.isValid}
                      t18n="logged_in:home:info:send"
                      onPress={handleSubmit(async ({ rating, comment }) => {
                        await call({ stars: rating, message: comment });
                        onDismiss();
                        toast.show(t('ui:toasts:rating_submitted_successfully'), { type: 'success' });
                      })}
                    />
                  </View>
                );
              }}
            </Form>
          </View>
        </View>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export { RatingModal };
