import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronsUpDown } from 'lucide-react';

import getCurrentUser from '@/services/getCurrentUser';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenuTrigger } from '../ui/dropdown-menu';
import { SidebarMenuButton } from '../ui/sidebar';

function UserTriggerItem() {
  const currentUser = useSuspenseQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser(),
  });

  return (
    <DropdownMenuTrigger asChild>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
          <AvatarImage
            src={currentUser.data.avatar}
            alt={currentUser.data.firstName}
          />
          <AvatarFallback className="rounded-lg">
            {currentUser.data.firstName.charAt(0)}
            {currentUser.data.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">
            {currentUser.data.firstName} {currentUser.data.lastName} ({currentUser.data.locale})
          </span>
          <span className="truncate text-xs">{currentUser.data.email}</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
  );
}
export default UserTriggerItem;
