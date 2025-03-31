import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <main className="w-full">
        <Header />
        <div className="flex flex-1 flex-col  p-4">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
