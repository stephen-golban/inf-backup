import React from 'react';
import { noop } from 'lodash';
import { useLogoutService } from '@services/logout';

import { View } from '@components/common';
import { SectionsModule } from '@modules/logged-in';

const SectionsScreen = () => {
  const logout = useLogoutService();
  return (
    <View m="md">
      <SectionsModule
        onEdit={noop}
        onLogout={logout}
        onOpenContacts={noop}
        onOpenSettings={noop}
        onInviteFriends={noop}
        onOpenMyAccount={noop}
        onOpenMyNotitications={noop}
      />
    </View>
  );
};

export { SectionsScreen };
