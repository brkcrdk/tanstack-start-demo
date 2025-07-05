interface VideoProps {
  id: number;
  title: string;
  duration: number;
  description: string;
  path: string;
  hashCode: string;
  channel: ChannelProps;
  coverImage: string;
  thumbnails: string[];
}
