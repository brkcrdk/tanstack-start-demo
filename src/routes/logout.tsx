import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { deleteCookie } from '@tanstack/react-start/server';

const logoutHandler = createServerFn({ method: 'POST' }).handler(async () => {
  deleteCookie('access_token');
  deleteCookie('refresh_token');
  throw redirect({ to: '/login' });
});

export const Route = createFileRoute('/logout')({
  loader: () => logoutHandler(),
});
