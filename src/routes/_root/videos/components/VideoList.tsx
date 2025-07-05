import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import getVideoList from '@/services/getVideoList';

function VideoList() {
  const routeApi = getRouteApi('/_root/videos/');
  const search = routeApi.useSearch();

  const videoList = useSuspenseQuery({
    queryKey: ['videoList', search],
    queryFn: () => getVideoList({ data: search }),
  });

  return (
    <ul className="flex flex-col gap-4">
      {videoList.data.map(video => (
        <li key={video.id}>
          <Card>
            <CardHeader>
              <CardTitle>{video.title}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default VideoList;
