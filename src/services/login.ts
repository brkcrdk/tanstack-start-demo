import { createServerFn } from '@tanstack/react-start';
import z from 'zod/v4-mini';

import fetcher from '@/lib/fetcher';
import { setUserCookies } from '@/lib/userCookieHandlers';

interface LoginResponse {
  token: string;
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
      url: '/login',
      requireAuth: false,
      formData: false,
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify(data),
      },
    });

    /**
     * NOT: Hata olduğu zaman exception çalışacak ve useMutation hook'u bu hatayı yakalayacak.
     * Hata olmadığı zaman bu değerler kesin olduğu için cookileri set edebiliyoruz.
     */
    setUserCookies(response.token, response.refreshToken);

    return response;
  });

export default loginMutation;
