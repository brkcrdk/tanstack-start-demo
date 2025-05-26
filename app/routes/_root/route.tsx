import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import Header from "./components/Header";
import Footer from "./components/Footer";

import db from "@/lib/db";

export const chechkAuthToken = createServerFn({ method: "GET" }).handler(
  async () => {
    // Redirect the user to the home page
    const accessToken = getCookie("access_token");

    // const x = await db.data?.users.find((user) => user.id === 1);

    if (!accessToken) {
      throw redirect({
        to: "/login",
      });
    }
  }
);

export const Route = createFileRoute("/_root")({
  loader: () => chechkAuthToken(),
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
