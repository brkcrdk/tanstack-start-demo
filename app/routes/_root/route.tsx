import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const Route = createFileRoute("/_root")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
