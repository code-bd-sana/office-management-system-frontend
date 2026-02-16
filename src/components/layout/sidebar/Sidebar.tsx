"use client";

import { LogOut } from "lucide-react";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SIDEBAR_NAV_ITEMS } from "@/constants/navigation";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col bg-brand-navy">
      {/* Logo */}
      <SidebarLogo />

      <Separator className="bg-white/15" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} item={item} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6">
        <Separator className="mb-4 bg-white/15" />
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4.6 w-4.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
