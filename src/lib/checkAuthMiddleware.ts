import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import * as z from 'zod/v4-mini';

import appConfig from '@/app.config';

import { getUserCookies, setUserCookies } from './userCookieHandlers';
interface RefreshResponse {
  token: string;
  refreshToken: string;
}

const checkAuthMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const result = await next();

  const { accessToken, refreshToken } = getUserCookies();

  const isValidToken = z.jwt().safeParse(accessToken);

  if (!isValidToken.success && refreshToken) {
    const refreshRequest = await fetch(`${appConfig.apiUrl}/refresh_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshRequest.ok) {
      const refreshResponse: RefreshResponse = await refreshRequest.json();
      setUserCookies(refreshResponse.token, refreshResponse.refreshToken);
    } else {
      throw redirect({
        to: '/login',
      });
    }
  }

  if (!accessToken && !refreshToken) {
    throw redirect({
      to: '/login',
    });
  }
  return result;
});

export default checkAuthMiddleware;
