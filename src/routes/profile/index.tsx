import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import getCurrentUser from '@/services/getCurrentUser';

export const Route = createFileRoute('/profile/')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['currentUser'],
      queryFn: () => getCurrentUser(),
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  return (
    <header>
      <h1>Hello "/profile/"! inner</h1>
      <pre>{JSON.stringify(currentUser.data.email, null, 4)}</pre>
    </header>
  );
}
