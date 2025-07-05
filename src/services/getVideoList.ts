import { createServerFn } from '@tanstack/react-start';
import querystring from 'query-string';
import * as z from 'zod/v4';

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
    const query = querystring.stringify(
      {
        page: data.page,
        itemsPerPage: data.itemsPerPage,
      },
      { skipNull: true }
    );
    return fetcher<VideoProps[]>({
      url: `/videos?${query}`,
    });
  });

export default getVideoList;
