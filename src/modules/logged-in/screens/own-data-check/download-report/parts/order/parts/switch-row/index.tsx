import React from 'react';

import { Avatar, Icon, IconType, Switch, Text, View } from '@components/common';

interface ISwitchRow {
  value: any;
  icon: IconType;
  keyword: string;
  onChange: (...event: any[]) => void;
}

const SwitchRow: React.FC<ISwitchRow> = ({ keyword, icon, value, onChange }) => {
  return (
    <View row between align="center">
      <View row align="center" fill>
        <Avatar.Base size={26} br={6} bw={1} bc="blue" center>
          <Icon icon={icon} />
        </Avatar.Base>

        <Text variant="14-semi" color="gray" t18n={`logged_in:credit_report:download:order:${keyword}` as any} ml="sm" flex />
      </View>
      <Switch checked={value as boolean} onCheckedChange={onChange} sizeW={38} sizeH={20} />
    </View>
  );
};

export { SwitchRow };
