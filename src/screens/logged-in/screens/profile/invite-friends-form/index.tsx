import React from 'react';

import { useLazyAxios } from '@api/hooks';

import { InviteFriendsFormModule } from '@modules/logged-in';

import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const InviteFriendsFormScreen: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.INVITE_FRIENDS_FORM>> = ({ navigation }) => {
  const [call, { loading, error }] = useLazyAxios({
    method: 'post',
    url: '/feedback/recommendation',
  });

  return (
    <InviteFriendsFormModule
      onSubmit={async data => {
        await call({ firstName: data.firstName, lastName: data.lastName, email: data.email, phone: '+373' + data.phone });
        await navigation.goBack();
      }}
      loading={loading}
    />
  );
};

export { InviteFriendsFormScreen };
