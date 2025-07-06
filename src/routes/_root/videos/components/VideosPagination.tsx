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
          {[1, 2, 3, 4, 5, 6].map(pageNumber => (
            <PaginationLink
              key={pageNumber}
              isActive={page === pageNumber}
              href={`/videos?page=${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          ))}
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
