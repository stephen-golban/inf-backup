import React from 'react';

import { View } from '@components/common';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation/core/logged-in/screens/profile';
import { DeleteAccountModule } from '@modules/logged-in/screens';

const DeleteAccountScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.DELETE_ACCOUNT>> = () => {
  return <DeleteAccountModule />;
};

export { DeleteAccountScreen };
