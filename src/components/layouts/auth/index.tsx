import React from 'react';

import { KeyboardAware, Screen, ScreenProps, Text, View } from '@components/common';

import type { I18nKey } from '@translations/locales';

interface IAuthLayout extends ScreenProps {
  page_title: I18nKey;
  isLongSheet?: boolean;
  isChangePassword?: boolean;
}

const AuthLayout: React.FC<IAuthLayout> = ({ children, page_title, isLongSheet = false, isChangePassword = false, ...props }) => {
  return (
    <KeyboardAware>
      <Screen bg="lightGray" p="zero" statusColor="primary" {...props}>
        <View fill bg="primary" between rg={isLongSheet ? 'lg' : 'xxl'}>
          <View center mt={isLongSheet ? 'lg' : 'xxl'} px="lg">
            {!isChangePassword && (
              <View>
                <Text t18n="logged_out:login:title" variant="18-bold" color="blue" textAlign="center" />
                <Text t18n="logged_out:login:subtitle" variant="16-semi" color="blue" textAlign="center" mt="sm" />
              </View>
            )}
          </View>
          <View fill btlr="xl" btrr="xl" bg="lightGray">
            <View bg="mediumGray" h={4} w={45} alignSelf="center" mt="md" />
            <View fill p="lg">
              <Text t18n={page_title} variant="24-bold" />

              {children}
            </View>
          </View>
        </View>
      </Screen>
    </KeyboardAware>
  );
};

export { AuthLayout };
