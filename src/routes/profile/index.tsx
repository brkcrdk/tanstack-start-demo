import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Controller, useForm, useFormState } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import getCurrentUser from '@/services/getCurrentUser';

const localeOptions: Record<'tr' | 'en', string> = {
  tr: 'Türkçe',
  en: 'English',
};

const profileSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  locale: z.enum(['tr', 'en']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

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
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      const currentUser = await getCurrentUser();
      return {
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        locale: currentUser.locale,
      };
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  const { isLoading } = useFormState({ control: form.control });

  return (
    <section aria-label="User Profile Area">
      <h4 className="text-2xl font-bold">Profile</h4>
      {isLoading ? (
        <div>Form loading...</div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex max-w-md flex-col gap-4"
        >
          <Label htmlFor="email">Email</Label>
          {/* <Input
          type="email"
          id="email"
          placeholder="test@test.com"
          value={currentUser.data.email}
          autoComplete="off"
        />
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          placeholder="test"
          value={currentUser.data.firstName}
          autoComplete="off"
        />
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          type="text"
          id="lastName"
          placeholder="test"
          value={currentUser.data.lastName}
          autoComplete="off"
        /> */}
          <Label htmlFor="locale">Locale</Label>
          <Controller
            control={form.control}
            name="locale"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger id="locale">
                  <SelectValue placeholder={localeOptions[field.value]} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(localeOptions).map(([key, value]) => (
                    <SelectItem
                      key={key}
                      value={key}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Button type="submit">Kaydet</Button>
        </form>
      )}
    </section>
  );
}
