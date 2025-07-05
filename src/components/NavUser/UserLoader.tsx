import { Skeleton } from '../ui/skeleton';

function UserLoader() {
  return (
    <div className="flex min-h-12 items-center gap-2">
      <Skeleton className="size-12 flex-[0.2] rounded-full" />
      <div className="grid size-full flex-[0.8] gap-2">
        <Skeleton className="flex size-full h-4 rounded-sm" />
        <Skeleton className="flex h-2 w-1/2 rounded-sm" />
      </div>
    </div>
  );
}
export default UserLoader;
