import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import getCurrentUser from '@/services/getCurrentUser';
import updateUserProfile from '@/services/updateUserProfile';

import { ProfileFormValues } from '../index';

const localeOptions: Record<'tr' | 'en', string> = {
  tr: 'Türkçe',
  en: 'English',
};

function UserForm() {
  const currentUser = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,

    // NOT: VARSAYILAN INVALIDATE ÖRNEĞİ
    // onSuccess: (data, variables) => {
    //   // console.log(data, variables);
    //   // toast.success('User profile updated successfully');
    //   queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    //   // queryClient.setQueryData(['currentUser'], data);
    // },

    // NOT: OPTIMISTIC UPDATE ÖRNEĞİ
    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ['currentUser'] });

      const previousUser = queryClient.getQueryData<UserProps>(['currentUser']);

      queryClient.setQueryData<UserProps>(['currentUser'], oldData => {
        if (oldData) {
          return { ...oldData, ...data };
        }
      });

      return { previousUser };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData<UserProps>(['currentUser'], context?.previousUser);
      toast.error('Failed to update user profile');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const onSubmit = ({ locale }: ProfileFormValues) => {
    mutate({
      data: {
        locale,
        // Backend eğer avatar gönderilmezse mevcut avatarı siliyor. Bu nedenle mevcut avatarı da gönderiyoruz.
        avatar: currentUser.data.avatar,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-md flex-col gap-4"
    >
      <pre>{JSON.stringify(currentUser.data.locale, null, 4)}</pre>
      <Label htmlFor="email">Email</Label>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            type="email"
            id="email"
            placeholder="test@test.com"
            value={field.value}
            readOnly
            autoComplete="off"
          />
        )}
      />
      <Label htmlFor="firstName">First Name</Label>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <Input
            type="text"
            id="firstName"
            placeholder="test"
            value={field.value}
            onChange={field.onChange}
            autoComplete="off"
            className={cn(errors.firstName && 'border-red-500')}
          />
        )}
      />
      {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}

      <Label htmlFor="lastName">Last Name</Label>
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <Input
            type="text"
            id="lastName"
            placeholder="test"
            value={field.value}
            autoComplete="off"
            readOnly
          />
        )}
      />
      <Label htmlFor="locale">Locale</Label>
      <Controller
        control={control}
        name="locale"
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
          >
            <SelectTrigger
              id="locale"
              className="w-full"
            >
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
      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Kayıt Ediliyor...' : 'Kaydet'}
      </Button>
    </form>
  );
}
export default UserForm;
