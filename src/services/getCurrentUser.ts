import { createServerFn } from '@tanstack/react-start';

import fetcher from '@/lib/fetcher';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const getCurrentUser = createServerFn({
  method: 'GET',
}).handler(async () => {
  return fetcher<User>({
    url: '/current_user',
    requireAuth: true,
    formData: false,
    fetchOptions: {
      method: 'GET',
    },
  });
});

export default getCurrentUser;
