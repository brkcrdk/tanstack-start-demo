import { createServerFn } from '@tanstack/react-start';

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
  await sleep(2000);
  const response = await fetcher<User>({
    url: '/current_user',
    requireAuth: true,
    formData: false,
    fetchOptions: {
      method: 'GET',
    },
  });
  return response;
});

export default getCurrentUser;
