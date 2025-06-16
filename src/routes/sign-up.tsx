import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
