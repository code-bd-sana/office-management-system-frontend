import { MainLayout } from "@/components/layout/MainLayout";
import { OverallPerformanceChart } from "@/components/performance/OverallPerformanceChart";
import { MonthlyComparisonChart } from "@/components/performance/MonthlyComparisonChart";

export default function PerformancePage() {
  return (
    <MainLayout pageTitle="Performance">
      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-foreground/60 sm:mb-8 sm:text-base">
        Lorem ipsum dolor sit amet consectetur. Volutpat a hendrerit sed dui
        netus aliquam fermentum placerat. Tempus scelerisque donec blandit
        lectus urna proin cursus.
      </p>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        <OverallPerformanceChart />
        <MonthlyComparisonChart />
      </div>
    </MainLayout>
  );
}
