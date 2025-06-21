import { createFileRoute } from '@tanstack/react-router';

import getCurrentUser from '@/services/getCurrentUser';

//LOOK AT THIS: https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query?path=examples%2Freact%2Fstart-basic-react-query%2Fsrc%2Froutes%2F__root.tsx
export const Route = createFileRoute('/profile/')({
  loader: () => getCurrentUser(),
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = Route.useLoaderData();

  return (
    <header>
      <h1>Hello "/profile/"! inner</h1>
      <pre>{JSON.stringify(currentUser, null, 4)}</pre>
    </header>
  );
}
