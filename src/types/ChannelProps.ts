interface ChannelProps {
  visibility: {
    id: number;
    name: string;
  };
  id: number;
  name: string;
  logo: string;
  cover: string;
  slug: string;
  status: 'active' | 'passive';
  cover_thumbnail: string;
  subscriberCount: number;
  videoCount: number;
  totalClap: number;
  totalComment: number;
  totalView: number;
  haveNewVideo: boolean;
  canManage: boolean;
}
