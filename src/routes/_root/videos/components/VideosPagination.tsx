import { getRouteApi } from '@tanstack/react-router';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

function VideosPagination() {
  const routeApi = getRouteApi('/_root/videos/');
  const { page } = routeApi.useSearch();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            from="/videos"
            search={({ page }) => ({ page: page && page > 1 ? page - 1 : 1 })}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/videos?page=1">1</PaginationLink>
          <PaginationLink href="/videos?page=2">2</PaginationLink>
          <PaginationLink href="/videos?page=3">3</PaginationLink>
          <PaginationLink href="/videos?page=4">4</PaginationLink>
          <PaginationLink href="/videos?page=5">5</PaginationLink>
          <PaginationLink href="/videos?page=6">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            from="/videos"
            search={({ page }) => ({ page: page && page >= 1 ? page + 1 : 1 })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default VideosPagination;
