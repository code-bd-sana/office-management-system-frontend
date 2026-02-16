import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarUserProfile } from "./NavbarUserProfile";
import { DEMO_USER } from "@/constants/dashboard";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between  bg-[#f1eeee] px-6">
      {/* Page title */}
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {/* Search */}
        <NavbarSearch />

        {/* User profile */}
        <NavbarUserProfile user={DEMO_USER} />
      </div>
    </header>
  );
}
