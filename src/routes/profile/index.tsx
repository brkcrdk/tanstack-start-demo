import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod/v4';

import getCurrentUser from '@/services/getCurrentUser';

import UserForm from './components/UserForm';

const profileSchema = z.object({
  email: z.email(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1),
  locale: z.enum(['tr', 'en']),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const Route = createFileRoute('/profile/')({
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery({
      queryKey: ['currentUser'],
      queryFn: () => getCurrentUser(),
    });
  },
  pendingComponent: () => <div>Loading profile page</div>,
  errorComponent: () => <div>Error profile page</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const data = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: data.data,
  });

  return (
    <section aria-label="User Profile Area">
      <h4 className="text-2xl font-bold">Profile</h4>
      <FormProvider {...form}>
        <UserForm />
      </FormProvider>
    </section>
  );
}
