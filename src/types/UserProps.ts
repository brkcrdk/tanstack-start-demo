type UserRoleTypes = 'ROLE_ADMIN' | 'ROLE_USER';

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  roles: UserRoleTypes[];
  channels: ChannelProps[];
  locale: 'tr' | 'en';
  metadata: {
    isAdmin: boolean;
    isChannelAdmin: boolean;
  };
}
