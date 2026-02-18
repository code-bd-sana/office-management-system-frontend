import { DCR_REVIEW_DESCRIPTION } from "@/constants/dcr-review";

export function DcrReviewHeader() {
  return (
    <div className="mb-4 sm:mb-6">
      <p className="mt-1 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-2xl">
        {DCR_REVIEW_DESCRIPTION}
      </p>
    </div>
  );
}
