"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItem } from "./SidebarNavItem";
import { SIDEBAR_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserInfo } from "@/hooks/useUserInfo";
import { AuthenticationService } from "@/api";
import { useMemo } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout, token } = useAuth();
  const router = useRouter();
  const { role, department } = useUserInfo();

  // Hide Projects for employees outside the sales department
  const navItems = useMemo(() => {
    const isNonSalesEmployee =
      role?.toUpperCase() === "EMPLOYEE" &&
      department?.toUpperCase() !== "SALES";
    if (!isNonSalesEmployee) return SIDEBAR_NAV_ITEMS;
    return SIDEBAR_NAV_ITEMS.filter((item) => item.href !== "/projects");
  }, [role, department]);

  const handleLogout = async () => {
    try {
      if (token) {
        await AuthenticationService.authControllerLogout({
          authorization: `Bearer ${token}`,
        });
      }
    } catch {
      // Even if the API call fails, still clear local state
    }
    logout();
    router.replace("/login");
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-brand-navy transition-transform duration-300 ease-in-out",
          "lg:z-30 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <SidebarLogo />

        <Separator className="bg-white/10" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <SidebarNavItem key={item.href} item={item} onNavigate={onClose} />
          ))}
        </nav>

        <Separator className="bg-white/10" />

        {/* Logout */}
        <button
          type="button"
          className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </aside>
    </>
  );
}
