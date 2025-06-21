import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Toaster } from '@/components/ui/sonner';
/**
 * Vite'e özel bir statik dosya import etme yöntemi olduğu için `?url` suffixi eklenmiştir.
 *
 * @see https://vite.dev/guide/assets
 */
import appCss from '@/styles/index.css?url';

const createRootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const queryClient = new QueryClient();

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
