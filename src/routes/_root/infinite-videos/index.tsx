import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import getVideoList from '@/services/getVideoList';

const ITEMS_PER_PAGE = 10;

const videoSearchSchema = z.object({
  itemsPerPage: z.number().catch(ITEMS_PER_PAGE),
});

export const Route = createFileRoute('/_root/infinite-videos/')({
  validateSearch: videoSearchSchema,
  beforeLoad: ({ search, context }) => {
    context.queryClient.ensureInfiniteQueryData({
      queryKey: ['infinite-video-list'],
      queryFn: ({ pageParam = 1 }) => getVideoList({ data: { page: pageParam, itemsPerPage: search.itemsPerPage } }),
      initialPageParam: 1,
    });
  },
  component: RouteComponent,
  pendingComponent: () => <div>Loading infinite video list page</div>,
  errorComponent: () => <div>Error infinite video list</div>,
});

function RouteComponent() {
  const search = Route.useSearch();

  const { data, fetchNextPage, fetchPreviousPage, isFetchingNextPage, isFetchingPreviousPage } = useInfiniteQuery({
    queryKey: ['infinite-video-list'],
    queryFn: ({ pageParam = 1 }) => getVideoList({ data: { page: pageParam, itemsPerPage: search.itemsPerPage } }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => firstPageParam - 1,
    maxPages: 4,
  });

  if (!data) return 'rendering infinite video list ...';

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => fetchPreviousPage()}>Fetch Previous Page</Button>

      <ul className="flex flex-col gap-4">
        {isFetchingPreviousPage && <div>Fetching previous page...</div>}

        {data.pages.map(page => {
          return page.map(video => {
            return (
              <li key={video.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{video.title}</CardTitle>
                  </CardHeader>
                </Card>
              </li>
            );
          });
        })}
        {isFetchingNextPage && <div>Fetching next page...</div>}
      </ul>
      <Button onClick={() => fetchNextPage()}>Fetch Next Page</Button>
    </div>
  );
}
