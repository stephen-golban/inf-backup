import React from 'react';

import { DefaultModule } from '@modules/logged-out';

import { LOGGED_OUT_SCREENS, type LoggedOutStackScreenProps } from '@typings/navigators';

const Default: React.FC<LoggedOutStackScreenProps<LOGGED_OUT_SCREENS.DEFAULT>> = ({}) => {
  return <DefaultModule />;
};

export { Default };
