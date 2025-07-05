import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import getCurrentUser from '@/services/getCurrentUser';

export const Route = createFileRoute('/profile/')({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['currentUser'],
      queryFn: () => getCurrentUser(),
    });
  },
  pendingComponent: () => <div>Loading profile page</div>,
  errorComponent: () => <div>Error profile page</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const currentUser = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  return (
    <section aria-label="User Profile Area">
      <h4 className="text-2xl font-bold">Profile</h4>
      <form
        action=""
        className="mx-auto flex max-w-md flex-col gap-4"
      >
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="test@test.com"
          disabled
          readOnly
          value={currentUser.data.email}
        />
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          placeholder="test"
          disabled
          readOnly
          value={`${currentUser.data.firstName} ${currentUser.data.lastName}`}
        />
      </form>
    </section>
  );
}
