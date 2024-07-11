import React from 'react';

import { useAppStore } from '@store/app';

import { SectionItem } from './parts';
import SectionInfo from './parts/section-info';
import { Screen, ScrollView } from '@components/common';
import { useTheme } from '@theme/index';

interface ISectionsModule {
  onEdit(): void;
  onLogout(): void;
  onOpenContacts(): void;
  onOpenSettings(): void;
  onOpenMyAccount(): void;
  onInviteFriends(): void;
  onOpenMyNotitications(): void;
}

const SectionsModule: React.FC<ISectionsModule> = props => {
  const { spacing } = useTheme();
  const { user } = useAppStore();
  const { onEdit, onLogout, onOpenContacts, onOpenSettings, onOpenMyAccount, onInviteFriends, onOpenMyNotitications } = props;

  return (
    <Screen scroll unsafe style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.md }}>
      <SectionInfo firstName={user?.firstName} lastName={user?.lastName} avatar={user?.photo} onEdit={onEdit} />
      <SectionItem title="profile:sections:my_account" onPressItem={onOpenMyAccount} icon="UserIcon" />
      <SectionItem title="profile:sections:my_notifications" onPressItem={onOpenMyNotitications} icon="NotificationsIcon" />
      <SectionItem title="profile:sections:invite_your_friends" onPressItem={onInviteFriends} bg="gold" icon="GiftIcon" />
      <SectionItem title="profile:sections:contacts" onPressItem={onOpenContacts} icon="ContactIcon" />
      <SectionItem title="profile:sections:account_settings" onPressItem={onOpenSettings} icon="SettingsIcon" />
      <SectionItem title="profile:sections:log_out" onPressItem={onLogout} icon="LogoutIcon" />
    </Screen>
  );
};

export { SectionsModule };
