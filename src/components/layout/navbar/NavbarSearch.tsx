import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NavbarSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search"
        className="h-9 w-56 rounded-sm border-border bg-muted/50 pl-9 text-sm focus-visible:ring-brand-navy/30"
      />
    </div>
  );
}
