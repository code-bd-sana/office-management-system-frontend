"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export function MainLayout({ children, pageTitle }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — drawer on mobile, fixed on lg+ */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area — no offset on mobile, ml-60 on lg+ */}
      <div className="flex flex-1 flex-col lg:ml-60">
        <Navbar
          title={pageTitle}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 bg-content-bg p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
