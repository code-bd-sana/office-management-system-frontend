import { DcrViewProfile } from "./DcrViewProfile";
import { DcrTaskTable } from "./DcrTaskTable";
import { DcrAttachments } from "./DcrAttachments";
import { DcrLeaderFeedback } from "./DcrLeaderFeedback";
import { DcrReplySection } from "./DcrReplySection";
import { DEMO_DCR_VIEW_DETAILS } from "@/constants/dcr-review";

export function DcrViewDetailsContent() {
  const data = DEMO_DCR_VIEW_DETAILS;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Profile Section */}
      <DcrViewProfile
        memberName={data.memberName}
        employeeId={data.employeeId}
        avatar={data.avatar}
      />

      {/* Task Completed Section */}
      <div>
        <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
          Task Completed
        </h3>
        <DcrTaskTable tasks={data.tasks} />
      </div>

      {/* Attachments Section */}
      {data.attachments.length > 0 && (
        <DcrAttachments attachments={data.attachments} />
      )}

      {/* Leader Feedback Section */}
      {data.feedback && <DcrLeaderFeedback feedback={data.feedback} />}

      {/* Reply Section */}
      <DcrReplySection />
    </div>
  );
}
