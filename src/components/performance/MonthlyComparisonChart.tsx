"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const chartData = [
  { name: "Last Month", totalProjects: 3200, projectValue: 4800 },
  { name: "This Month", totalProjects: 4200, projectValue: 4600 },
];

export function MonthlyComparisonChart() {
  return (
    <div className="rounded-sm border border-border/60 bg-white p-4 sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground sm:mb-6 sm:text-lg">
        Monthly Perfoemance Comparison
      </h3>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-4">
        {/* Chart area */}
        <div className="w-full xl:flex-1">
          {/* Custom Legend */}
          <div className="mb-4 flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-6 rounded-xs bg-[#044192]" />
              <span className="text-xs text-foreground/70">Total Projects</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-6 rounded-xs bg-[#14804A]" />
              <span className="text-xs text-foreground/70">Project Value</span>
            </div>
          </div>

          <div className="h-50 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -15, bottom: 5 }}
                barCategoryGap="20%"
                barGap={5}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) =>
                    value >= 1000 ? `$${value / 1000}k` : `$${value}`
                  }
                />
                <Legend content={() => null} />
                <Bar
                  dataKey="totalProjects"
                  name="Total Projects"
                  fill="#044192"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  dataKey="projectValue"
                  name="Project Value"
                  fill="#14804A"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary stats */}
        <div className="flex flex-row gap-4 xl:gap-0 xl:flex-col justify-center">
          {/* Total Projects stat */}
          <div className="border p-4">
            <p className="text-base font-bold text-foreground sm:text-lg lg:text-xl">
              Total : 70
            </p>
            <p className="mt-0.5 text-xs text-foreground/60 sm:text-sm">
              <span className="font-semibold text-[#14804A]">+10</span>{" "}
              <span className="font-semibold text-[#14804A]">+17%</span>
            </p>
          </div>

          {/* Revenue stat */}
          <div className="border p-4">
            <p className="text-base font-bold text-foreground sm:text-lg lg:text-xl">
              $112k
            </p>
            <p className="mt-0.5 text-xs text-foreground/60 sm:text-sm">
              <span className="font-semibold text-[#14804A]">+32k</span>{" "}
              <span className="font-semibold text-[#14804A]">+322k</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
