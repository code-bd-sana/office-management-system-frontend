import { DashboardCard } from "./DashboardCard";
import { DASHBOARD_CARDS } from "@/constants/dashboard";

export function DashboardGrid() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_CARDS.map((card) => (
          <DashboardCard key={card.id} data={card} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Click on any card to view detailed history and manage operations
      </p>
    </section>
  );
}
