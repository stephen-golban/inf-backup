import React from 'react';
import { noop } from 'lodash';

import { FaqModule } from '@modules/logged-in';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const FaqScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.FAQ>> = () => {
  return <FaqModule onPressCreditHistory={noop} onPressInfo={noop} onPressProcedure={noop} onPressQuestions={noop} />;
};

export default FaqScreen;
