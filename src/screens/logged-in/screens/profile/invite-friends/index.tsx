import React from 'react';
import { InviteFriendsModule } from '@modules/logged-in';
import { PROFILE_SCREENS, ProfileStackScreenProps } from '@typings/navigation';

const InviteFriends: React.FC<ProfileStackScreenProps<PROFILE_SCREENS.INVITE_FRIENDS>> = ({ navigation }) => {
  return <InviteFriendsModule onInvite={() => navigation.navigate(PROFILE_SCREENS.INVITE_FRIENDS_FORM)} />;
};

export default InviteFriends;
