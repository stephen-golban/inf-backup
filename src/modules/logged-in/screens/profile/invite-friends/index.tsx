import React from 'react';
import { FilledButton, Icon, Image, Screen, Text, View } from '@components/common';

interface IInviteFriendsModule {
  onInvite(): void;
}

const InviteFriendsModule: React.FC<IInviteFriendsModule> = ({ onInvite }) => {
  return (
    <Screen pt="zero" scroll unsafe bg="white">
      <View bg="lightBlue" fill p="lg" br="lg" center>
        <View w={322} h={174} alignSelf="center" mb="md">
          <Image br="lg" source={require('@assets/images/invite-friend.png')} />
        </View>
        <Text center my="sm" variant="20-bold" t18n="profile:invite_friends:free_month_access" />
        <Text center variant="12-reg" t18n="profile:invite_friends:invite_benefit" />
        <View>
          <View row g="sm" px="md" my="sm">
            {/* <Icon icon="SquareShareIcon" /> */}
            <Text t18n="profile:invite_friends:send_link" />
          </View>

          <View row g="sm" px="md" my="sm">
            {/* <Icon icon="FavoriteIcon" /> */}
            <Text t18n="profile:invite_friends:get_month" />
          </View>

          <View row g="sm" px="md" my="sm">
            {/* <Icon icon="EstateAgentIcon" /> */}
            <Text t18n="profile:invite_friends:discounts_accumulate" />
          </View>
        </View>
        <FilledButton mt="xl" t18n="logged_in:home:info:send" br="md" px="xhuge" onPress={onInvite} />
      </View>
    </Screen>
  );
};

export { InviteFriendsModule };
