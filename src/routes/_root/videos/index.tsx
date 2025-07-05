import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div>
      {videoList.data.map(video => (
        <Card key={video.id}>
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
