import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { z } from 'zod/v4-mini';

import fetcher from '@/lib/fetcher';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

import mutation from './mutation';

const loginMutationSchema = z.object({
  email: z.string(),
  password: z.string(),
});

// TODO: servisleri useMutation ile çağıracak bir yapı geliştirelim. bu mutationlarda da function olarak createServerFn ile oluşturduğumuz
// servisleri çağırabiliriz.
// Aynı şekilde queryleri de useQuery ile çağırabiliriz. Bunun altyapısını ve bir kaç örnek servisini geliştirelim.
const loginMutation = createServerFn({
  method: 'GET',
})
  .validator(loginMutationSchema)
  .handler(async () => {
    const response = await fetcher({
      url: '/loginxxx',
      requireAuth: false,
      formData: false,
      fetchOptions: {
        method: 'POST',
        body: JSON.stringify({
          email: 'burak1111',
          password: '123456',
        }),
      },
    });

    return response;
  });

export default loginMutation;
