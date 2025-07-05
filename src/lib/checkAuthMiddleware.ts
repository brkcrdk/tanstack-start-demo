import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import * as z from 'zod/v4-mini';

import { getUserCookies } from './userCookieHandlers';

const checkAuthMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const result = await next();

  const { accessToken, refreshToken } = getUserCookies();

  const isValidToken = z.jwt().safeParse(accessToken);

  if (!isValidToken.success && refreshToken) {
    console.log('revalidate token');
  }

  if (!accessToken && !refreshToken) {
    throw redirect({
      to: '/login',
    });
  }
  return result;
});

export default checkAuthMiddleware;
