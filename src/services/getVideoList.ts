import { createServerFn } from '@tanstack/react-start';
import z from 'zod/v4-mini';

import fetcher from '@/lib/fetcher';

const getVideoListSchema = z.object({
  page: z.number(),
  itemsPerPage: z.number(),
});

const getVideoList = createServerFn({
  method: 'GET',
})
  .validator(getVideoListSchema)
  .handler(async ({ data }) => {
    return fetcher<VideoProps[]>({
      url: `/videos?page=${data.page}&itemsPerPage=${data.itemsPerPage}`,
    });
  });

export default getVideoList;
