import { createServerFn } from '@tanstack/react-start';
// import { setCookie } from '@tanstack/react-start/server';

import fetcher from '@/lib/fetcher';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
