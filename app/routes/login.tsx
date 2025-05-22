import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: Shadcn eklenecek
  return <div>Hello "/login"!</div>;
}
