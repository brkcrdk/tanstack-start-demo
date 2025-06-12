import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";

import { z } from "zod/v4-mini";

const loginMutationSchema = z.object({
  email: z.email("custom email warning"),
  password: z.string(),
});

// servisleri useMutation ile çağıracak bir yapı geliştirelim.
const loginMutation = createServerFn({
  method: "GET",
})
  .validator(loginMutationSchema)
  .handler(async (ctx) => {
    const cookie = crypto.randomUUID();

    setCookie("access_token", cookie);
    return `Hello, ${ctx.data.email}! Your cookie is ${cookie}`;
  });

export default loginMutation;
