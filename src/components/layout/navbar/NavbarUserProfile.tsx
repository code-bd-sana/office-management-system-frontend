import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import type { UserProfile } from "@/types";

interface NavbarUserProfileProps {
  user: UserProfile;
}

export function NavbarUserProfile({ user }: NavbarUserProfileProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <button
      type="button"
      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
    >
      <Avatar className="h-9 w-9">
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
        <AvatarFallback className="bg-brand-navy text-xs font-semibold text-white">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="hidden text-left md:block">
        <p className="text-sm font-medium leading-tight text-foreground">
          {user.name}
        </p>
        <p className="text-xs leading-tight text-muted-foreground">
          {user.email}
        </p>
      </div>

      <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
    </button>
  );
}
