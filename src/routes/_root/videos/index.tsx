import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_root/videos/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_root/videos/"!</div>;
}
