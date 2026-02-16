import { Waypoints } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 px-4 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
        <Waypoints className="h-5 w-5 text-white" />
      </div>
      <span className="text-base font-semibold tracking-wide text-white">
        FB International BD
      </span>
    </div>
  );
}
