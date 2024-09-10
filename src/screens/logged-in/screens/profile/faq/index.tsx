import React from 'react';

import { useFaq } from './hooks';
import { FaqModule } from '@modules/logged-in';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const FaqScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.FAQ>> = () => {
  const { faq, loading } = useFaq();

  return <FaqModule faq={faq} loading={loading} />;
};

export default FaqScreen;
