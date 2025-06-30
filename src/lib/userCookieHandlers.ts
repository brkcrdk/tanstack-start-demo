import { getCookie, setCookie } from '@tanstack/react-start/server';

export function getUserCookies() {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

  return {
    accessToken,
    refreshToken,
  };
}

export function setUserCookies(accessToken: string, refreshToken: string) {
  setCookie('access_token', accessToken, {
    maxAge: 60 * 60 * 24 * 1,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  setCookie('refresh_token', refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
}
