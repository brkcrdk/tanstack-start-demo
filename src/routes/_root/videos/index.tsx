import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import getVideoList from '@/services/getVideoList';

import VideosPagination from './components/VideosPagination';

const videoSearchSchema = z.object({
  page: z.number().catch(1),
  itemsPerPage: z.number().catch(10),
});

export const Route = createFileRoute('/_root/videos/')({
  validateSearch: videoSearchSchema,
  beforeLoad: ({ search, context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['videoList', search],
      queryFn: () => getVideoList({ data: search }),
    });
  },
  pendingComponent: () => <div>Loading video list</div>,
  errorComponent: () => <div>Error video list</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const videoList = useSuspenseQuery({
    queryKey: ['videoList', search],
    queryFn: () => getVideoList({ data: search }),
  });

  return (
    <>
      <pre>{JSON.stringify(search, null, 4)}</pre>
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
