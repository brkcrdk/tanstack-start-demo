import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { z } from 'zod/v4-mini';

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
  .handler(async ctx => {
    console.log(ctx);
    const cookie = crypto.randomUUID();

    setCookie('access_token', cookie);
    return `Hello, ${ctx.data.email}! Your cookie is ${cookie}`;
  });

export default loginMutation;
