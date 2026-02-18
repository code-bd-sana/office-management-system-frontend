import { Button } from "@/components/ui/button";
import type { DcrFeedback } from "@/types/dcr-review";

interface DcrLeaderFeedbackProps {
  feedback: DcrFeedback;
}

export function DcrLeaderFeedback({ feedback }: DcrLeaderFeedbackProps) {
  return (
    <div>
      <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
        Leader Feedback
      </h3>
      <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
        {feedback.content}
      </p>
      <div className="mt-3 flex items-center justify-between sm:mt-4">
        <span className="text-xs text-muted-foreground sm:text-sm">
          {feedback.timeAgo}
        </span>
        <Button className="rounded-sm bg-[#044192] px-5 py-2 text-xs font-semibold text-white hover:bg-[#044192]/90 sm:px-6 sm:text-sm">
          Reply
        </Button>
      </div>
    </div>
  );
}
