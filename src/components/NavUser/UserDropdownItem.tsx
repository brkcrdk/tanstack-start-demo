import { useSuspenseQuery } from '@tanstack/react-query';

import getCurrentUser from '@/services/getCurrentUser';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenuLabel } from '../ui/dropdown-menu';

function UserDropdownItem() {
  const currentUser = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  return (
    <DropdownMenuLabel className="p-0 font-normal">
      <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
          <AvatarImage
            src={currentUser.data.avatar}
            alt={currentUser.data.firstName}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">
            {currentUser.data.firstName} {currentUser.data.lastName}
          </span>
          <span className="truncate text-xs">{currentUser.data.email}</span>
        </div>
      </div>
    </DropdownMenuLabel>
  );
}

export default UserDropdownItem;
