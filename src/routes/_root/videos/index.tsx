import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import getVideoList from '@/services/getVideoList';

export const Route = createFileRoute('/_root/videos/')({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['videoList'],
      queryFn: () => getVideoList(),
    });
  },
  pendingComponent: () => <div>Loading video list</div>,
  errorComponent: () => <div>Error video list</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const videoList = useSuspenseQuery({
    queryKey: ['videoList'],
    queryFn: () => getVideoList(),
  });

  return (
    <>
      <ul className="flex flex-col gap-4">
        {videoList.data.map(video => (
          <li key={video.id}>
            <Card>
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
