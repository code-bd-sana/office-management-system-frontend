import Link from "next/link";
import { cn } from "@/lib/utils";
import type { DashboardCardData } from "@/types";

interface DashboardCardProps {
  data: DashboardCardData;
  onClick?: (cardId: string) => void;
}

export function DashboardCard({ data, onClick }: DashboardCardProps) {
  // For tasks, projects, team-members, learning-training, my-attendance, dcr-submission, and shift-assignment cards, use onClick handler to open modal
  if (
    (data.id === "tasks" ||
      data.id === "projects" ||
      data.id === "team-members" ||
      data.id === "learning-training" ||
      data.id === "my-attendance" ||
      data.id === "dcr-submission" ||
      data.id === "shift-assignment") &&
    onClick
  ) {
    return (
      <button
        onClick={() => onClick(data.id)}
        className="group block w-full text-left"
      >
        <div
          className={cn(
            "relative rounded-sm border p-4 sm:p-5 transition-all",
            "hover:shadow-md hover:border-border/50",
            data.cardColor,
          )}
        >
          {/* Icon */}
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white">
            <data.icon className="h-6 w-6" />
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
            <span className="text-sm text-muted-foreground">
              {data.subtitle}
            </span>
          </div>
        </div>
      </button>
    );
  }

  // For other cards, use Link
  return (
    <Link href={data.href} className="group block">
      <div
        className={cn(
          "relative rounded-sm border p-4 sm:p-5 transition-all",
          "hover:shadow-md hover:border-border/50",
          data.cardColor,
        )}
      >
        {/* Icon */}
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white">
          <data.icon className="h-6 w-6" />
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
