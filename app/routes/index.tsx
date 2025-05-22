import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

const login = createServerFn({ method: "GET" }).handler(async () => {
  const accessToken = getCookie("access_token");
  console.log({ accessToken });
  return "x";
});

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <button
      type="button"
      onClick={async () => {
        const res = await login();
        console.log(res);
      }}>
      Login and this will set httpOnly cookies
    </button>
  );
}
