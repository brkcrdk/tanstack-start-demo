import { createServerFn } from '@tanstack/react-start';

import fetcher from '@/lib/fetcher';

const updateUserProfile = createServerFn({
  method: 'POST',
}).handler(async () => {
  return 'x';
});

export default updateUserProfile;
