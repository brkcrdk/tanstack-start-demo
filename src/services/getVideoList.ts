import { createServerFn } from '@tanstack/react-start';

import fetcher from '@/lib/fetcher';

const getVideoList = createServerFn({
  method: 'GET',
}).handler(async () => {
  return fetcher<VideoProps[]>({
    url: '/videos',
  });
});

export default getVideoList;
