"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "WIP", value: 25, fill: "#7172D2" },
  { name: "Pending", value: 5, fill: "#EA9010" },
  { name: "Delivered", value: 40, fill: "#14804A" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

const RADIAN = Math.PI / 180;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCustomizedLabel(props: any) {
  const { cx, cy, midAngle, outerRadius, percent, name, value } = props;
  const radius = outerRadius;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const textAnchor = x > cx ? "start" : "end";
  const estWidth = 68;
  const estHeight = 32;
  const rectX = textAnchor === "start" ? x - 4 : x - estWidth + 4;
  const rectY = y - 10;

  return (
    <g>
      <rect
        x={rectX}
        y={rectY}
        width={estWidth}
        height={estHeight}
        rx={4}
        fill="white"
        opacity={0.92}
      />
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fontSize={11}
        fill="#334155"
      >
        <tspan fontWeight={600}>{`${(percent * 100).toFixed(0)}%`}</tspan>
        <tspan x={x} dy="1.3em" fontSize={10} fill="#94a3b8">
          {`${name}: ${value}`}
        </tspan>
      </text>
    </g>
  );
}

export function OverallPerformanceChart() {
  return (
    <div className="rounded-sm border border-border/60 bg-white p-4 sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground sm:mb-6 sm:text-lg">
        Overall Performance
      </h3>

      <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center lg:gap-4">
        {/* Chart */}
        <div className="relative h-60 w-full max-w-70 sm:h-64 sm:max-w-75">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="75%"
                cornerRadius={8}
                paddingAngle={6}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground sm:text-sm">Total:</span>
            <span className="text-xl font-bold text-foreground sm:text-2xl">{total}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2.5">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-foreground/80 sm:text-sm">
                {item.name} : {item.value}{" "}
                <span className="font-semibold">
                  ({((item.value / total) * 100).toFixed(0)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
