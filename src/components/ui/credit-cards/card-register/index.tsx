import React from 'react';

import { OutlinedButton } from '@components/common';

interface ICardRegister {
  loading: boolean;
  onPress: () => void;
}

const CardRegister: React.FC<ICardRegister> = ({ onPress, loading }) => {
  return <OutlinedButton onPress={onPress} loading={loading} t18n="profile:settings:payment_history_screen:register_new_card" />;
};

export { CardRegister };
