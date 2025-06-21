import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { getCookie } from '@tanstack/react-start/server';

const checkAuthMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const result = await next();

  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

  if (!accessToken && !refreshToken) {
    throw redirect({
      to: '/login',
    });
  }
  return result;
});

export default checkAuthMiddleware;
