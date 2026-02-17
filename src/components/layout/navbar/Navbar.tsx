import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarUserProfile } from "./NavbarUserProfile";
import { DEMO_USER } from "@/constants/dashboard";

interface NavbarProps {
  title: string;
  onMenuToggle: () => void;
}

export function Navbar({ title, onMenuToggle }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-[#f1eeee] px-4 sm:px-6">
      {/* Left section: hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-foreground/70 hover:text-foreground lg:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page title */}
        <h1 className="text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Search - hidden on very small screens */}
        <div className="hidden sm:flex">
          <NavbarSearch />
        </div>

        {/* User profile */}
        <NavbarUserProfile user={DEMO_USER} />
      </div>
    </header>
  );
}
