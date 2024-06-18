import React from 'react';

import { IPicker } from '../types';
import { Icon as CustomIcon } from '@components/common';

const TimePickerIcon: React.FC<Pick<IPicker, 'Icon'>> = ({ Icon }) => {
  if (Icon) {
    if (typeof Icon === 'string') {
      return <CustomIcon icon={Icon} size={20} />;
    }
    return Icon;
  }

  return <CustomIcon icon="CalendarIcon" size={20} />;
};

export default TimePickerIcon;
