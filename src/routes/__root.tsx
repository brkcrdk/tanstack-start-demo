import type { ReactNode } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import type { QueryClient } from '@tanstack/react-query';

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

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="top-right" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}
