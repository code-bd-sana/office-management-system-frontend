import { SHIFT_STYLES } from "@/constants/shift";
import type { ShiftType } from "@/types/shift";

const LEGEND_ITEMS: ShiftType[] = ["morning", "evening", "night", "off"];

export function ShiftCalendarLegend() {
  return (
    <div className="mt-5 flex items-center gap-8 px-2">
      {LEGEND_ITEMS.map((type) => {
        const style = SHIFT_STYLES[type];
        return (
          <div key={type} className="flex items-center gap-2">
            <span className="text-base">{style.icon}</span>
            <span className="text-sm font-medium text-foreground/70">
              {style.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
