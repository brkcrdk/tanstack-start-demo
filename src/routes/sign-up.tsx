import { createFileRoute } from '@tanstack/react-router';

import LoginForm from './login/components/LoginForm';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
