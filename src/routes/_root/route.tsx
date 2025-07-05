import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import AppSidebar from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import checkAuthMiddleware from '@/lib/checkAuthMiddleware';
import getCurrentUser from '@/services/getCurrentUser';

const chechkAuthToken = createServerFn({ method: 'GET' })
  .middleware([checkAuthMiddleware])
  .handler(async () => {
    return true;
  });

export const Route = createFileRoute('/_root')({
  beforeLoad: () => chechkAuthToken(),
  /**
   * NOTE: Bu routea giriş yapıldığında `currentUser`a ait cache değerini dolduruyoruz. Bu noktadan sonra uygulama içerisinde
   * ihtiyacı olan componentlerde `useSuspenseQuery` hooku ile bu cache değerini kullanabiliyoruz. useSuspenseQuery hooku ile cache değerini kullanırken
   * `Suspense` kullanarak da UI'ın sadece veri çeken kısımlarda loading yaparak ui'ın olabildiğince az bloklanmasını sağlamış oluyoruz.
   */
  loader: async ({ context }) => {
    context.queryClient.prefetchQuery({
      queryKey: ['currentUser'],
      queryFn: () => getCurrentUser(),
      /**
       * NOTE: Süresiz bir şekilde cachte saklıyoruz ve eğer bir güncelleme olmuşsa zaten manual revalidate edilmesi gerekiyor.
       * Eğer stale süresini kısa tutarsak, her rerender işleminde cachei temizliyor ve gereksiz yere tekrar request atılıyor.
       */
      staleTime: Infinity,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {/* <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink> */}
                  <BreadcrumbLink asChild>
                    <Link to="/">Building Your Application</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
