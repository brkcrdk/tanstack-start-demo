import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod/v4-mini';

import fetcher from '@/lib/fetcher';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const loginMutationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const loginMutation = createServerFn({
  method: 'GET',
})
  .validator(loginMutationSchema)
  .handler(async ({ data }) => {
    const response = await fetcher<LoginResponse>({
      // url: '/current_user',
      // url: '/videos/db916a61',
      url: '/login',
      requireAuth: false,
      formData: false,
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify(data),
      },
    });

    console.log('response', response);

    return response;
  });

export default loginMutation;
