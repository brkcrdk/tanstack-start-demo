import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

import getVideoDetail from '@/services/getVideoDetail';

function VideoDetail() {
  const routeApi = getRouteApi('/_root/videos/$videoId/');
  const { videoId } = routeApi.useParams();

  const data = useSuspenseQuery({
    queryKey: ['videoDetail', videoId],
    queryFn: () => getVideoDetail({ data: { videoHashCode: videoId } }),
  });

  return <div>VideoDetail is here {data.data.title}</div>;
}
export default VideoDetail;
