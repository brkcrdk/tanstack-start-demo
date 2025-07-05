import { createServerFn } from '@tanstack/react-start';

import fetcher from '@/lib/fetcher';

const getCurrentUser = createServerFn({
  method: 'GET',
}).handler(async () => {
  return fetcher<UserProps>({
    url: '/current_user',
  });
});

export default getCurrentUser;
