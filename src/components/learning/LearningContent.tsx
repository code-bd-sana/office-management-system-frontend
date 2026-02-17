import { LearningTable } from "./LearningTable";
import { LEARNING_DESCRIPTION } from "@/constants/learning";

export function LearningContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground/80 sm:text-lg sm:pr-8 md:text-2xl">
        {LEARNING_DESCRIPTION}
      </p>

      {/* Table */}
      <LearningTable />
    </div>
  );
}
