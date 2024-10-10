import React from 'react';

import { Switch, Text, View } from '@components/common';

interface ITermExtension {
  toggled: boolean;
  onChange(value: boolean): void;
}

const TermExtension: React.FC<ITermExtension> = ({ toggled, onChange }) => {
  return (
    <View row align="center" mt="lg">
      <Text variant="16-bold" t18n="logged_in:payment:automatic_term_extension" />
      <Switch checked={toggled} onCheckedChange={onChange} ml="sm" sizeW={38} sizeH={20} />
    </View>
  );
};

export { TermExtension };
