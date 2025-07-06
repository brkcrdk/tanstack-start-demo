import { createServerFn } from '@tanstack/react-start';
import * as z from 'zod/v4-mini';

import fetcher from '@/lib/fetcher';

const updateUserProfileSchema = z.object({
  locale: z.enum(['tr', 'en']),
  avatar: z.string(),
});

const updateUserProfile = createServerFn({
  method: 'POST',
})
  .validator(updateUserProfileSchema)
  .handler(async ({ data }) => {
    return fetcher<{ message: string }>({
      url: '/user-edit',
      fetchOptions: {
        method: 'PUT',
        body: JSON.stringify(data),
      },
    });

    return true;
  });

export default updateUserProfile;
