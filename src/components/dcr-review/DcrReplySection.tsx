"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DcrReplySection() {
  const [reply, setReply] = useState("");

  return (
    <div>
      <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
        Reply
      </h3>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Type here"
        rows={4}
        className="w-full resize-none rounded-sm border border-border/60 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#044192] sm:text-base"
      />
      <div className="mt-3 flex justify-end sm:mt-4">
        <Button className="rounded-sm bg-[#044192] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#044192]/90 sm:px-8 sm:text-sm">
          Send
        </Button>
      </div>
    </div>
  );
}
