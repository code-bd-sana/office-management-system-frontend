import { LearningTable } from "./LearningTable";
import { LEARNING_DESCRIPTION } from "@/constants/learning";

export function LearningContent() {
  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-2xl pr-8 leading-relaxed text-muted-foreground/80">
        {LEARNING_DESCRIPTION}
      </p>

      {/* Table */}
      <LearningTable />
    </div>
  );
}
