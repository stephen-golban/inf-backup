import { InviteFriendsFormFields } from '../resolver';

const DEFAULT_VALUES: InviteFriendsFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default function useInviteFriendsModule() {
  return { DEFAULT_VALUES };
}
