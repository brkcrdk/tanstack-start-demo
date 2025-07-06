import { createServerFn } from '@tanstack/react-start';
import * as z from 'zod/v4';

import fetcher from '@/lib/fetcher';

const getVideoDetailSchema = z.object({
  videoHashCode: z.string(),
});

const getVideoDetail = createServerFn({
  method: 'GET',
})
  .validator(getVideoDetailSchema)
  .handler(async ({ data }) => {
    return fetcher<VideoProps>({
      url: `/videos/${data.videoHashCode}`,
    });
  });

export default getVideoDetail;
