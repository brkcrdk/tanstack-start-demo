import { createServerFn } from '@tanstack/react-start';

import fetcher from '@/lib/fetcher';

const getCurrentUser = createServerFn({
  method: 'GET',
}).handler(async () => {
  const user = await fetcher<UserProps>({
    url: '/current_user',
  });

  return {
    ...user,
    metadata: {
      isAdmin: user.roles.includes('ROLE_ADMIN'),
      isChannelAdmin: user.channels.some(channel => channel.canManage),
    },
  };
});

export default getCurrentUser;
