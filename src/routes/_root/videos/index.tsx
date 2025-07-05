import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import getVideoList from '@/services/getVideoList';

import VideosPagination from './components/VideosPagination';

export const Route = createFileRoute('/_root/videos/')({
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['videoList', { page: 1, itemsPerPage: 10 }],
      queryFn: () => getVideoList({ data: { page: 1, itemsPerPage: 10 } }),
    });
  },
  pendingComponent: () => <div>Loading video list</div>,
  errorComponent: () => <div>Error video list</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const videoList = useSuspenseQuery({
    queryKey: ['videoList', { page: 1, itemsPerPage: 10 }],
    queryFn: () => getVideoList({ data: { page: 1, itemsPerPage: 10 } }),
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
      <VideosPagination />
    </>
  );
}
