import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export function MainLayout({ children, pageTitle }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content area, offset by sidebar width */}
      <div className="ml-60 flex flex-1 flex-col">
        <Navbar title={pageTitle} />

        <main className="flex-1 bg-content-bg p-6">{children}</main>
      </div>
    </div>
  );
}
