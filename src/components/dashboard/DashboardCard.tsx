import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardCardData } from "@/types";

interface DashboardCardProps {
  data: DashboardCardData;
}

export function DashboardCard({ data }: DashboardCardProps) {
  const Icon = data.icon;

  return (
    <Link href={data.href} className="group block">
      <div
        className={cn(
          "relative rounded-sm border border-transparent p-5 transition-all",
          "hover:shadow-md hover:border-border/50",
          data.cardColor
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-11 w-11 items-center justify-center rounded-sm",
            data.iconColor
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground">
          {data.title}
        </h3>

        {/* Stats */}
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-foreground">
            {data.count}
          </span>
          <span className="text-sm text-muted-foreground">{data.subtitle}</span>
        </div>
      </div>
    </Link>
  );
}
