import { Suspense } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';

import getVideoList from '@/services/getVideoList';

import VideoList from './components/VideoList';
import VideosPagination from './components/VideosPagination';

const ITEMS_PER_PAGE = 10;

const videoSearchSchema = z.object({
  page: z.number().catch(1),
  itemsPerPage: z.number().catch(ITEMS_PER_PAGE),
});

export const Route = createFileRoute('/_root/videos/')({
  validateSearch: videoSearchSchema,
  beforeLoad: ({ search, context }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['videoList', search],
      queryFn: () => getVideoList({ data: search }),
    });
  },
  pendingComponent: () => <div>Loading video list page</div>,
  errorComponent: () => <div>Error video list</div>,
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();

  return (
    <>
      <pre>{JSON.stringify(search, null, 4)}</pre>
      <Suspense fallback={<div>Loading video list with suspense</div>}>
        <VideoList />
      </Suspense>
      <VideosPagination />
    </>
  );
}
