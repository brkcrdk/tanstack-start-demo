import { Suspense } from 'react';

import { createFileRoute } from '@tanstack/react-router';

import getVideoDetail from '@/services/getVideoDetail';

import VideoDetail from './components/VideoDetail';

export const Route = createFileRoute('/_root/videos/$videoId/')({
  loader: async ({ context, params: { videoId } }) => {
    const videoData = await context.queryClient.ensureQueryData({
      queryKey: ['videoDetail', videoId],
      queryFn: () => getVideoDetail({ data: { videoHashCode: videoId } }),
    });

    return { videoTitle: videoData.title };
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading video detail page</div>,
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.videoTitle }] : undefined,
  }),
});

function RouteComponent() {
  return (
    <Suspense fallback={<div>Loading video detail page</div>}>
      <VideoDetail />
    </Suspense>
  );
}
