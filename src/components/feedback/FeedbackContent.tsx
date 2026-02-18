import Image from "next/image";
import { FeedbackSingle } from "./FeedbackSingle";
import FeedbackHeader from "./FeedbackHeader";

export function FeedbackContent() {
  return (
    <div className="space-y-6 px-6">
      <FeedbackHeader />

      <FeedbackSingle />

      <FeedbackSingle />
    </div>
  );
}
