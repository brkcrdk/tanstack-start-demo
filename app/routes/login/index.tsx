import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import LoginForm from "./components/LoginForm";

// import { LoginForm } from "@/components/login-form";

// export const chechkAuthToken = createServerFn({ method: "GET" }).handler(
//   async () => {
//     // Redirect the user to the home page
//     const accessToken = getCookie("access_token");

//     throw redirect({
//       to: "/",
//     });
//   }
// );

export const Route = createFileRoute("/login/")({
  // loader: () => chechkAuthToken(),
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}
